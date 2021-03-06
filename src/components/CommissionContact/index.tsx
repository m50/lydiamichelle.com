import React, { FormEvent } from 'react';
import { ReactComponent as InstaIcon } from '../Header/SVG/Instagram.svg';
import { ExtLink } from 'components/styled/Links';
import { instagram } from 'lib/constants';
import type { Commission } from 'types/Commission';

interface Props {
  commission: Commission
}

const CommissionContact: React.FC<Props> = ({ commission }) => {

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "multipart/form-data" },
      body: new URLSearchParams(formData as any).toString(),
    }).then((res) => {
      console.log('Form successfully submitted');
    });
  }

  return (
    <div>
      <section className="bg-black py-20 text-white flex flex-col justify-center content-center items-center">
        <p className="text-4xl mb-4">
          If you would like to place an order, you can contact me on my
          <ExtLink href={instagram}><InstaIcon className="inline fill-current w-8 h-8" /> Instagram</ExtLink>.
        </p>
        <p className="text-4xl my-8">Or</p>
        <p className="text-4xl mt-4">You can Email me:</p>
      </section>
      <section className="bg-white relative">
        <img className="absolute opacity-25 top-0 left-0 w-full h-full object-cover object-center select-none"
          src="/imgs/grunge-paper-texture.jpg" alt="" unselectable="on" aria-hidden="true" />
        <div className="w-full md:w-2/3 2xl:w-1/2 mx-auto flex items-center content-center flex-col-reverse lg:flex-row relative z-10">
          <form name="commission-contact" data-netlify="true" onSubmit={formSubmit}>
          </form>
        </div>
      </section>
    </div>
  );
}

export default CommissionContact;
