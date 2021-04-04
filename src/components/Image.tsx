/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/alt-text */
import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { Paths } from 'collections/series/Series';

type ImgProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  paths: Paths;
};

export const Image: React.FC<ImgProps> = ({ src, paths, ...props }) => {
  let halfType = 'image/webp';
  if (paths.half?.match(/\.jpe?g\?/)) {
    halfType = 'image/jpeg';
  }
  let fullType = 'image/webp';
  if (paths.full?.match(/\.jpe?g\?/)) {
    fullType = 'image/jpeg';
  }
  return (
    <picture className={props.className}>
      {paths.half && <source media="(max-width: 799px)" srcSet={paths.half} type={halfType} />}
      {paths.full && <source media="(min-width: 800px)" srcSet={paths.full} type={fullType} />}
      <img loading="lazy" src={src || paths.original} {...props} />
    </picture>
  );
};

export default Image;
