import React, { FormEvent } from 'react';
import { Commission } from 'types/Commission';

interface Props {
  commission: Commission;
}

const formClasses = `
  w-full mx-auto relative z-10 py-20
  flex items-center content-center flex-col-reverse
  md:w-2/3 2xl:w-1/2 lg:flex-row
`;

const ContactForm: React.FC<Props> = ({ commission }) => {
  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: new URLSearchParams(formData as any).toString(),
    }).then(() => {
      console.log('Form successfully submitted');
    });
  };

  return (
    <section className="bg-white relative">
      <img className="absolute opacity-25 top-0 left-0 w-full h-full object-cover object-center select-none"
        src="/imgs/grunge-paper-texture.jpg" alt="" unselectable="on" aria-hidden="true"
      />
      <form className={formClasses} name="commission-contact" data-netlify="true" method="POST" onSubmit={formSubmit}>
        <input type="hidden" name="form-name" value="commission-contact" />
        <input type="hidden" name="title" value={commission.title} />
        <input type="hidden" name="medium" value={commission.type} />
        <label htmlFor="work-size">
          Size:
          <select name="work-size" id="work-size">
            {commission.workSizes.map((workSize, idx) => (
              <option key={idx} value={workSize.title}>{workSize.title}</option>
            ))}
          </select>
        </label>
      </form>
    </section>
  );
};

export default ContactForm;
