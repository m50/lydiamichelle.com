import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type ImgProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  height?: number
};

export const Image = React.forwardRef<HTMLImageElement, ImgProps>(({ src, height, ...props }, ref) => {
  height = height || 800;
  const baseQuery = `/api/optimize?image=${encodeURIComponent(src as string)}`;
  const query = `${baseQuery}&height=${height}`;

  const halfHeight = height / 2;
  const halfQuery = `${baseQuery}&height=${halfHeight}`;

  // TODO: Move optimization logic to run when building, rather than through an API.

  return <img loading="lazy" ref={ref} src={src} {...props} />;

  // return (
  //   <picture className={props.className}>
  //     <source media="(max-width: 799px)" srcSet={halfQuery} type="image/webp" />
  //     <source media="(min-width: 800px)" srcSet={query} type="image/webp" />
  //     <img loading="lazy" ref={ref} src={src} {...props} />
  //   </picture>
  // );
});
