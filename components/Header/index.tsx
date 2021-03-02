import * as React from 'react';
import Image from 'next/image'
import Nav from './Nav';

const headerClasses = `
  z-10 py-3 h-auto md:h-32 print:hidden flex flex-col
  md:flex-row items-center content-center justify-between
  bg-black text-gray-100 w-full
`;

export const Header: React.FC = () => (
  <header className={headerClasses}>
    <img className="h-12 mb-4 md:hidden"
      src="/static/imgs/logo.png" alt="Lydia Michelle Logo"
    />
    <a className="ml-0 md:ml-20 flex flex-col md:flex-row mb-4" rel="author" href="/">
      <h1 className="font-serif uppercase text-xl tracking-wider">Lydia Michelle</h1>
    </a>
    <Nav />
  </header>
);
export default Header;
