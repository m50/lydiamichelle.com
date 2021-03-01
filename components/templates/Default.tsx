import * as React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Head from 'next/head';

export const DefaultTemplate: React.FC<React.PropsWithChildren<any>> = ({children}) => (
  <>
    <Header />
    <main className="flex flex-col" aria-label="Content">
      {children}
    </main>
    <Footer />
  </>
);

export default DefaultTemplate;
