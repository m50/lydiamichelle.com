import React from 'react';

interface P extends React.PropsWithChildren<any> {
  to: string;
  newTab?: boolean;
}

export const ExtLink: React.FC<P> = ({ to, children, newTab = true }) => (
  <a {...(newTab ? {target: "_blank"} : { })} className="text-theme-pink hover:underline" href={to}>{children}</a>
);
