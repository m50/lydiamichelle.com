import PaperSection from 'components/styled/PaperSection';
import { slug } from 'lib/helpers';
import React, { FormEvent, useCallback, useState } from 'react';
import { Commission, WorkSize } from 'types/Commission';

interface Props {
  commission: Commission;
}

const formClasses = `
  w-full mx-auto relative z-10 pb-20 pt-5
  flex items-center content-center flex-col
  md:w-2/3 2xl:w-1/2
`;

const ContactForm: React.FC<Props> = ({ commission }) => {
  const [size, setSize] = useState<WorkSize | undefined>(commission.workSizes[0]);

  const formSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const body = new URLSearchParams(formData as any).toString();
    console.log({ body });
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    }).then(() => {
      console.log('Form successfully submitted');
    });
  }, []);

  const onWorkSizeChange: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
    ({ target }) => setSize(commission.workSizes.find((ws) => ws.title === target.value)),
    [commission],
  );

  return (
    <PaperSection aria-label="Commission form">
      <form className={formClasses} name="commission-contact"
        data-netlify="true" netlify-honeypot="bot-field"
        method="POST" onSubmit={formSubmit}
      >
        <input type="hidden" name="form-name" value="commission-contact" />
        <input type="hidden" name="title" value={commission.title} />
        <p className="hidden">
          <label htmlFor="bot-field">Don’t fill this out if you’re human: <input name="bot-field" /></label>
        </p>
        <input type="hidden" name="medium" value={commission.type} />
        <label htmlFor="email" className="w-full lg:w-1/2 mt-10">
          <span className="text-3xl mr-4">Email:</span>
          <input name="email" type="text" id="email"
            className="bg-transparent border-b-2 text-3xl border-gray-300 cursor-pointer"
          />
        </label>
        <label htmlFor="work-size" className="w-full lg:w-1/2 mt-10">
          <span className="text-3xl mr-4">Size:</span>
          <select name="work-size" onChange={onWorkSizeChange}
            className="bg-transparent border-b-2 text-3xl border-gray-300 cursor-pointer"
          >
            {commission.workSizes.map((workSize, idx) => (
              <option key={idx} value={workSize.title}>{workSize.title}</option>
            ))}
          </select>
        </label>
        <div className="w-full lg:w-1/2 mt-10">
          {size?.prices.map((price, idx) => (
            <div key={idx} className="w-full flex justify-between px-2">
              <label htmlFor={`${idx}-${slug(price.title)}`} className="inline-flex items-center cursor-pointer">
                <input type="checkbox" name={`${idx}-${slug(price.title)}`}
                  id={`${idx}-${slug(price.title)}`}
                  className={`
                    form-checkbox text-theme-pink rounded bg-transparent border border-gray-400 cursor-pointer
                  `}
                />
                <span className="ml-2">{price.title}</span>
              </label>
              <p className="uppercase">{price.value}</p>
            </div>
          ))}
        </div>
        <label htmlFor="extra-info" className="w-full lg:w-1/2 mt-10">
          <span className="text-3xl mr-4 block">Extra Info:</span>
          <textarea name="extra-info" id="extra-info" rows={5}
            className="w-full bg-white bg-opacity-40 border border-gray-300 p-2 rounded-lg"
          />
        </label>
        <small className="text-center text-gray-500 mt-2">
          <p>An image of the pet(s) will be requested upon acceptance of commission.</p>
          <p>Alternatively, a link to a photo of your pet(s) can be provided in the "Extra Info" section.</p>
        </small>
        <input type="submit" value="Submit"
          className={`
            block px-8 py-4 bg-theme-pink-dark rounded text-white mt-10 cursor-pointer
            hover:bg-theme-pink
          `}
        />
      </form>
    </PaperSection>
  );
};

export default ContactForm;
