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

const NavArrow: React.FC<NavArrowProps> = (props) => (
  <div className={"justify-center content-center " + props.className}>
    <Link href={props.to}>
      <a className={arrowLinkClasses}>{props.children}</a>
    </Link>
  </div>
);

export default NavArrow;
