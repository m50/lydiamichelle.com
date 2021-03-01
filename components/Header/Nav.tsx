import React from 'react';
import { etsy, instagram, redBubble } from '../../lib/constants';
import { ExtLink, IntLink } from '../styled/Links';
import { ReactComponent as ShopIcon } from './SVG/Shop.svg';
import { ReactComponent as EtsyIcon } from './SVG/Etsy.svg';
import { ReactComponent as InstaIcon } from './SVG/Instagram.svg';

export const Nav: React.FC = () => (
  <nav className="mr-0 md:mr-20 text-sm font-light mb-4">
    <IntLink href="/">Home</IntLink>
    <IntLink href="/portfolio">Portfolio</IntLink>
    <ExtLink href={redBubble}>
      <span className="sr-only">Shop</span>
      <ShopIcon className="inline fill-current w-5 h-5" />
    </ExtLink>
    <ExtLink href={etsy}>
      <span className="sr-only">Etsy</span>
      <EtsyIcon className="inline fill-current w-5 h-5" />
    </ExtLink>
    <ExtLink href={instagram}>
      <span className="sr-only">My Instagram</span>
      <InstaIcon className="inline fill-current w-5 h-5" />
    </ExtLink>
  </nav>
);

export default Nav;
