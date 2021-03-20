import React from 'react';
import { etsy, instagram, redBubble } from 'lib/constants';
import { ReactComponent as ShopIcon } from 'components/svg/Shop.svg';
import { ReactComponent as EtsyIcon } from 'components/svg/Etsy.svg';
import { ReactComponent as InstaIcon } from 'components/svg/Instagram.svg';
import { ExtLinkWhite, IntLinkWhite } from '../styled/Links';

export const Nav: React.FC = () => (
  <nav className="mr-0 md:mr-20 text-md font-light mb-4 flex flex-col lg:flex-row items-center">
    <span>
      <IntLinkWhite href="/">Home</IntLinkWhite>
      <IntLinkWhite href="/portfolio">Portfolio</IntLinkWhite>
      <IntLinkWhite href="/commissions">Commission</IntLinkWhite>
    </span>
    <span>
      <ExtLinkWhite href={redBubble}>
        <span className="sr-only">Shop</span>
        <ShopIcon className="inline fill-current w-5 h-5" />
      </ExtLinkWhite>
      <ExtLinkWhite href={etsy}>
        <span className="sr-only">Etsy</span>
        <EtsyIcon className="inline fill-current w-5 h-5" />
      </ExtLinkWhite>
      <ExtLinkWhite href={instagram}>
        <span className="sr-only">My Instagram</span>
        <InstaIcon className="inline fill-current w-5 h-5" />
      </ExtLinkWhite>
    </span>
  </nav>
);

export default Nav;
