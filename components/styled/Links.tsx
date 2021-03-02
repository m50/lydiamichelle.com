import React from 'react';
import Link, { LinkProps } from 'next/link';

interface P extends React.PropsWithChildren<any> {
  href: string;
  newTab?: boolean;
}

export const ExtLink: React.FC<P> = ({ href, children, newTab = true }) => (
  <a {...(newTab ? { target: "_blank" } : {})}
    className="text-theme-pink hover:underline mx-2"
    href={href}>{children}</a>
);
export const ExtLinkWhite: React.FC<P> = ({ href, children, newTab = true }) => (
  <a {...(newTab ? { target: "_blank" } : {})}
    className="text-theme-white hover:text-theme-pink mx-2"
    href={href}>{children}</a>
);

export const IntLink: React.FC<LinkProps> = ({ children, ...linkProps }) => (
  <Link {...linkProps}>
    <a className="text-theme-pink hover:underline mx-2">{children}</a>
  </Link>
);
export const IntLinkWhite: React.FC<LinkProps> = ({ children, ...linkProps }) => (
  <Link {...linkProps}>
    <a className="text-theme-white hover:text-theme-pink mx-2">{children}</a>
  </Link>
);
