import { cl } from 'lib/helpers';
import React from 'react';
import { email, etsy, instagram } from '../lib/constants';
import { ExtLink, IntLink } from './styled/Links';

const Copy: React.FC = () => (
  <small className="text-xs text-white">
    <p className="my-2">
      &copy; All artwork copyrighted to Lydia Michelle Clardy
    </p>
    <p className="my-2">
      &copy; Built with love by{' '}
      <a className="hover:text-theme-pink hover:underline" href="https://clardy.eu/">
        Marisa Clardy
      </a>
    </p>
  </small>
);

const footerClasses = cl`
  text-gray-100 static w-full h-auto
  md:h-64 bg-black flex justify-center items-center
  content-center text-center z-10 py-4
`;

export const Footer: React.FC = () => (
  <footer className={footerClasses}>
    <div>
      <div className="text-2xl font-serif italic mb-5 space-y-2">
        <p>
          You can contact me at my{' '}
          <a className="text-theme-pink hover:underline" href={email}>email</a>{' '}
          or on my <a className="text-theme-pink hover:underline" href={instagram}>Instagram.</a>
        </p>
        <p>
          If you would like to support me, please request a{' '}
          <IntLink href="/commissions">Comission</IntLink>!
        </p>
        <p>
          Or purchase something from my
          <ExtLink href={etsy}>Etsy!</ExtLink>
        </p>
      </div>
      <Copy />
    </div>
  </footer>
);

export default Footer;
