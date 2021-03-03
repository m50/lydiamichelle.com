import * as React from 'react';
import { email, etsy, redBubble } from '../lib/constants';
import { ExtLink } from './styled/Links';

const Copy: React.FC = () => (
  <small className="text-xs text-white">
    <p>
      &copy; built by
      <a className="hover:text-theme-pink hover:underline" href="https://clardy.eu/">Marisa Clardy</a>
      with love for Lydia Michelle Clardy
    </p>
    <p>
      Icons made by <a className="hover:text-theme-pink hover:underline" href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>
      from <a className="hover:text-theme-pink hover:underline" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </p>
  </small>
);

export const Footer: React.FC = () => (
  <footer className="text-gray-100 static w-full h-auto md:h-64 bg-black flex justify-center items-center content-center text-center z-10 py-4">
    <div>
      <div className="text-xl font-serif italic mb-10 md:mb-20">
        <p>You can contact me at my <a className="text-theme-pink hover:underline" href={email}>email.</a></p>
        <p>
          If you would like to support me, purchase something from my <ExtLink href={redBubble}>Redbubble shop</ExtLink>
          or from my <ExtLink href={etsy}>Etsy!</ExtLink>
        </p>
      </div>
      <Copy />
    </div>
  </footer>
);

export default Footer;
