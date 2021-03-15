/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/alt-text */
import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { Paths } from 'types/Series';

type ImgProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  paths: Paths;
};

export const Image: React.FC<ImgProps> = ({ src, paths, ...props }) => (
  <picture className={props.className}>
    <source media="(max-width: 799px)" srcSet={paths.half} type="image/webp" />
    <source media="(min-width: 800px)" srcSet={paths.full} type="image/webp" />
    <img loading="lazy" src={src || paths.original} {...props} />
  </picture>
);

export default Image;
