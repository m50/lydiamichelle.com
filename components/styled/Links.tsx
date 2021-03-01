import React from 'react';
import Link, { LinkProps } from 'next/link';

interface P extends React.PropsWithChildren<any> {
  href: string;
  newTab?: boolean;
}

export const ExtLink: React.FC<P> = ({ href, children, newTab = true }) => (
  <a {...(newTab ? { target: "_blank" } : {})}
    className="text-theme-pink hover:underline"
    href={href}>{children}</a>
);


export const IntLink: React.FC<LinkProps> = ({ children, ...linkProps }) => (
  <Link {...linkProps}>
    <a className="text-theme-pink hover:underline">{children}</a>
  </Link>
);
