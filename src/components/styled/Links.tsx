import React, { useCallback } from 'react';
import Link, { LinkProps } from 'next/link';
import { track, parameters } from "insights-js";

interface P extends React.PropsWithChildren<any> {
  href: string;
  newTab?: boolean;
}

export const ExtLink: React.FC<P> = ({ href, children, newTab = true }) => {
  const onClick = useCallback(() => {
    track({
      id: 'navigated-external',
      parameters: {
        href,
        locale: parameters.locale(),
        screenSize: parameters.screenType(),
      },
    });
  }, [href]);
  return (
    <a {...(newTab ? { target: "_blank" } : {})}
      className="text-white hover:text-theme-pink mx-2" rel="noopener"
      href={href}>{children}</a>
  );
};
export const ExtLinkWhite: React.FC<P> = ({ href, children, newTab = true }) => {
  const onClick = useCallback(() => {
    track({
      id: 'navigated-external',
      parameters: {
        href,
        locale: parameters.locale(),
        screenSize: parameters.screenType(),
      },
    });
  }, [href]);
  return (
    <a {...(newTab ? { target: "_blank" } : {})}
      className="text-white hover:text-theme-pink mx-2" rel="noopener"
      href={href} onClick={onClick}>{children}</a>
  );
};

export const IntLink: React.FC<LinkProps> = ({ children, ...linkProps }) => (
  <Link {...linkProps}>
    <a className="text-theme-pink hover:underline mx-2">{children}</a>
  </Link>
);
export const IntLinkWhite: React.FC<LinkProps> = ({ children, ...linkProps }) => (
  <Link {...linkProps}>
    <a className="text-white hover:text-theme-pink mx-2">{children}</a>
  </Link>
);
