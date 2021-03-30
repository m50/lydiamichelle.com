import { cl } from 'lib/helpers';
import React from 'react';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

const PaperSection: React.FC<Props> = ({ children, className, ...props }) => (
  <section className={cl`${className ?? ''} bg-white relative`} {...props}>
    <picture className="absolute top-0 left-0 w-full h-full">
      <source srcSet="/imgs/paperbg.webp" type="image/webp" />
      <img
        className="opacity-40 h-full w-full object-cover object-center select-none"
        src="/imgs/paperbg.jpg" alt="" unselectable="on" aria-hidden="true" loading="lazy"
      />
    </picture>
    {children}
  </section>
);

export default PaperSection;
