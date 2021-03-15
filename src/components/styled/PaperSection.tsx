import React from 'react';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

const PaperSection: React.FC<Props> = ({ children, className, ...props }) => (
  <section className={`${className} bg-white relative`} {...props}>
    <img
      className="absolute opacity-25 top-0 left-0 w-full h-full object-cover object-center select-none"
      src="/imgs/grunge-paper-texture.webp" alt="" unselectable="on" aria-hidden="true" loading="lazy"
    />
    {children}
  </section>
);

export default PaperSection;
