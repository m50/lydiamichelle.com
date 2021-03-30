/* eslint-disable jsx-a11y/label-has-associated-control */
import PaperSection from 'components/styled/PaperSection';
import { cl, slug } from 'lib/helpers';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { Commission, Price, WorkSize } from 'types/Commission';
import useSendEmail from 'hooks/useSendEmail';
import { FileInput, ImageData } from 'components/styled/FileInput';
import { ReactComponent as CheckMark } from '../svg/tick.svg';
import { ReactComponent as ErrorMark } from '../svg/exclamation.svg';
import { formClasses, errorClasses, successClasses } from './classes';
import validate from './validate';

interface Props {
  commission: Commission;
}

const ContactForm: React.FC<Props> = ({ commission }) => {
  const [size, setSize] = useState<WorkSize | undefined>(commission.workSizes[0]);
  const [bot, setBot] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [valueOptions, setValueOptions] = useState<string[]>([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const sendEmail = useSendEmail();

  useEffect(() => {
    setMessage([]);
    setTotalPrice(0);
    setValueOptions([]);
    setSize(commission.workSizes[0]);
  }, [commission]);

  const formSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (bot.length > 0) {
      setMessage(['Received!']);
      return;
    }
    const workSize = size?.title;
    const values = {
      workSize,
      name,
      email,
      valueOptions,
      extraInfo,
      totalPrice,
    };
    if (await validate(values, setIsError, setMessage)) {
      const success = await sendEmail({
        medium: commission.type,
        type: commission.title,
        size: workSize as string,
        name,
        email,
        valueOptions: `<ul style="color: white;">${valueOptions.map((v) => `<li>${v}</li>`).join('')}</ul>`,
        extraInfo,
        totalPrice,
        imageData,
      });
      if (success) {
        setIsError(false);
        setMessage([
          'Request Received!',
          'Please allow some time for Lydia to review '
            + 'your request. She will send you an email when she has accepted your commission.',
        ]);
        return;
      }
      setIsError(true);
      setMessage(['Unable to send commission.', 'Please try again later']);
    }
  }, [size, bot, email, valueOptions, extraInfo, totalPrice, name, imageData]);

  const onWorkSizeChange: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
    ({ target }) => {
      setSize(commission.workSizes.find((ws) => ws.title === target.value));
      setValueOptions([]);
      setTotalPrice(0);
      setMessage([]);
    },
    [commission],
  );

  const onPriceChange = useCallback((target: HTMLInputElement, price: Price) => {
    setMessage([]);
    if (target.checked) {
      if (!Number.isNaN(+price.value)) {
        setTotalPrice((p) => p + Number(price.value));
      }
      setValueOptions((vo) => [...vo, price.title]);
    } else {
      if (!Number.isNaN(+price.value)) {
        setTotalPrice((p) => p - Number(price.value));
      }
      setValueOptions((vo) => vo.filter((vp) => vp !== price.title));
    }
  }, [commission, size]);

  return (
    <PaperSection aria-label="Commission form" className="px-5">
      <form className={formClasses} onSubmit={formSubmit}>
        <p className="hidden">
          <label htmlFor="bot-field">
            Don’t fill this out if you’re human:
            <input name="bot-field" onChange={({ target }) => setBot(target.value)} />
          </label>
        </p>
        <label htmlFor="name" className="w-full lg:w-1/2 mt-10">
          <span className="text-3xl mr-4">Name:</span>
          <input name="name" type="text" id="name"
            onChange={({ target }) => { setName(target.value); setMessage([]); }}
            className="bg-transparent border-b-2 text-3xl border-gray-300 cursor-pointer"
          />
        </label>
        <label htmlFor="email" className="w-full lg:w-1/2 mt-10">
          <span className="text-3xl mr-4">Email:</span>
          <input name="email" type="text" id="email"
            onChange={({ target }) => { setEmail(target.value); setMessage([]); }}
            className="bg-transparent border-b-2 text-3xl border-gray-300 cursor-pointer"
          />
        </label>
        <label htmlFor="work-size" className="w-full lg:w-1/2 mt-10">
          <span className="text-3xl mr-4">Size:</span>
          <select name="work-size" onChange={onWorkSizeChange}
            className="bg-transparent border-b-2 text-3xl border-gray-300 cursor-pointer"
            defaultValue={size?.title}
          >
            {commission.workSizes.map((workSize, idx) => (
              <option key={idx} value={workSize.title}>
                {workSize.title}
              </option>
            ))}
          </select>
        </label>
        <div className="w-full lg:w-1/2 mt-10">
          {size?.prices.map((price, idx) => (
            <div key={idx} className="w-full flex justify-between px-2">
              <label htmlFor={`${idx}-${slug(price.title)}`} className="inline-flex items-center cursor-pointer">
                <input type="checkbox" name={`${idx}-${slug(price.title)}`}
                  checked={valueOptions.indexOf(price.title) >= 0}
                  id={`${idx}-${slug(price.title)}`} onChange={({ target }) => onPriceChange(target, price)}
                  className={cl`
                    form-checkbox text-theme-pink rounded bg-transparent border border-gray-400 cursor-pointer
                    my-5 lg:my-0 p-4 lg:p-0
                  `}
                />
                <span className="ml-2">{price.title}</span>
              </label>
              <p className="uppercase inline-flex items-center">{price.value}</p>
            </div>
          ))}
        </div>
        <span className="mt-5 text-2xl">Total Price: &euro;{totalPrice}</span>
        <label htmlFor="extra-info" className="w-full lg:w-1/2 mt-10">
          <span className="text-3xl mr-4 block">Extra Info:</span>
          <textarea name="extra-info" id="extra-info" rows={5} onChange={({ target }) => setExtraInfo(target.value)}
            className="w-full bg-white bg-opacity-40 border border-gray-300 p-2 rounded-lg"
          />
        </label>
        {commission.allowImageUpload ? (
          <label htmlFor="referenceImage" className="w-full lg:w-1/2 mt-10">
            <p className="text-3xl mr-4">Reference image:</p>
            <FileInput id="referenceImage" name="referenceImage" text="Pick reference image"
              onChange={setImageData}
              className={cl`
                bg-theme-pink-dark text-white font-bold py-2 px-4 w-full inline-flex items-center justify-center
                hover:bg-theme-pink
              `}
            />
          </label>
        ) : (
          <small className="text-center text-gray-500 mt-2">
            <p>No image is needed for this commission type.</p>
            <p>
              If you would like to give images for reference,
              they can be provided in the "Extra Info" section as links.
            </p>
          </small>
        )}
        <input type="submit" value="Submit"
          className={cl`
            block px-8 py-4 bg-theme-pink-dark rounded text-white mt-10 cursor-pointer
            hover:bg-theme-pink
          `}
        />
        <div className={(isError ? errorClasses : successClasses) + (message.length > 0 ? '' : ' hidden')}>
          <span className="flex items-center content-center justify-center">
            {isError
              ? <ErrorMark className="inline fill-current w-24 h-24 p-2" />
              : <CheckMark className="inline fill-current w-24 h-24 p-2" />}
            <span className="p-4 w-full text-center">
              {message.map((m, idx) => <p key={idx} className="">{m}</p>)}
            </span>
          </span>
        </div>
      </form>
    </PaperSection>
  );
};

export default ContactForm;
