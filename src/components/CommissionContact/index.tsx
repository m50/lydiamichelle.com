import React from 'react';
import { ExtLink } from 'components/styled/Links';
import { ReactComponent as InstaIcon } from 'components/svg/Instagram.svg';
import { instagram } from 'lib/constants';
import type { Commission } from 'types/Commission';
import ContactForm from './ContactForm';

interface Props {
  commission: Commission;
}

const sectionClassNames = `
  bg-black py-20 text-white flex flex-col
  justify-center content-center items-center text-center
`;

const CommissionContact: React.FC<Props> = ({ commission }) => (
  <div>
    <section className={sectionClassNames}>
      <p className="px-5 text-3xl lg:text-4xl mb-4">
        If you would like to place an order, you can contact me on my
        <ExtLink href={instagram}><InstaIcon className="inline fill-current w-8 h-8" /> Instagram</ExtLink>.
      </p>
      <p className="px-5 text-3xl lg:text-4xl my-8">Or</p>
      <p className="px-5 text-3xl lg:text-4xl mt-4">You can Email me:</p>
    </section>
    <ContactForm commission={commission} />
  </div>
);

export default CommissionContact;
