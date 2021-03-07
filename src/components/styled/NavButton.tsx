import Link from 'next/link';
import React from 'react';

interface NavArrowProps extends React.PropsWithChildren<any> {
  to: string;
  className?: string;
}

const arrowLinkClasses = `
  text-white bg-white bg-opacity-30 rounded-full
  w-20 h-20
  flex justify-center content-center items-center
  text-4xl leading-none shadow-md
  hover:bg-opacity-40 hover:shadow-lg
`;

const NavArrow: React.FC<NavArrowProps> = ({ className, to, children }) => (
  <div className={`justify-center content-center cursor-pointer ${className}`}>
    <Link href={to}>
      <a href={to} className={arrowLinkClasses}>{children}</a>
    </Link>
  </div>
);

export default NavArrow;
