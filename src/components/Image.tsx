import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type ImgProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export const Image: React.FC<ImgProps> = ({ src, ...props }) => (
  <img src={src} {...props} />
);
// src={`/api/optimize?image=${encodeURIComponent(src as string)}`}
