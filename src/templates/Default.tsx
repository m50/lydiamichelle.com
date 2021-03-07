import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const wrapperClasses = 'flex flex-col justify-between min-h-screen text-theme-gray';
export const DefaultTemplate: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <div className={wrapperClasses} style={{ fontSize: '1.2rem' }}>
    <Header />
    <main className="flex flex-col mb-auto" aria-label="Content">
      {children}
    </main>
    <Footer />
  </div>
);

export default DefaultTemplate;
