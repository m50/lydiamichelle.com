import React from 'react';
import type { Series } from 'collections/series/Series';

export const Header: React.FC<Series> = (series) => (
  <section className="bg-theme-gray text-theme-pink grid justify-center px-5 py-20 text-center font-serif font-thin">
    <h2 className="text-6xl tracking-widest uppercase">{series.title}</h2>
    <p className="text-white my-12 font-sans">{series.excerpt}</p>
    <p className="opacity-75 italic">{new Date(series.date_published).getFullYear()}</p>
  </section>
);

export default Header;
