import Link from 'next/link';
import React from 'react';

interface NavArrowProps {
  to: string;
  className?: string;
  left?: boolean;
}

const arrowLinkClasses = `
  text-white bg-white bg-opacity-30 rounded-full
  w-20 h-20
  flex justify-center content-center items-center
  text-4xl leading-none shadow-md
  hover:bg-opacity-40 hover:shadow-lg
`;

const NavArrow: React.FC<NavArrowProps> = ({ className, to, left }) => (
  <div className={`justify-center content-center cursor-pointer ${className}`}>
    <Link href={to}>
      <a href={to} className={arrowLinkClasses}>{left ? <span>&#8592;</span> : <span>&#8594;</span>}</a>
    </Link>
  </div>
);

export default NavArrow;
