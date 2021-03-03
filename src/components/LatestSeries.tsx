import React from 'react';
import { ImageInfo, Series } from '../types/Series';

interface Props {
  latestSeries: Series;
  image: ImageInfo;
}

export const LatestSeries: React.FC<Props> = ({latestSeries, image}) => {
  const blk = 'rgba(0, 0, 0, 0.4)';

  return (
    <>
      <div className="hidden lg:block my-64 mx-auto text-center">
        <h2 className="uppercase tracking-widest font-thin text-theme-pink text-6xl font-serif mb-5">{latestSeries.title}</h2>
        <p className="text-white mb-16 font-thin">{latestSeries.excerpt}</p>
        <a className="text-theme-pink hover:underline" href={`portfolio/${latestSeries.slug}`}>
          {latestSeries.title} Series
        </a>
      </div>
      <div className="hidden lg:block w-1/2 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url('${image.image}')` }}
      >
        <p className="sr-only">Background image alt-text: {image.title} in {image.medium}</p>
      </div>

      <div className="lg:hidden block bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `linear-gradient( ${blk}, ${blk} ), url('${image.image}')` }}
      >
        <div className="my-32 mx-auto text-center">
          <h2 className="uppercase tracking-wider font-thin text-theme-pink text-6xl font-serif mb-5">{latestSeries.title}</h2>
          <p className="text-white mb-16 font-thin">{latestSeries.excerpt}</p>
          <a className="text-theme-pink hover:underline" href={`portfolio/${latestSeries.slug}`}>{latestSeries.title} Series</a>
        </div>
        <p className="sr-only">Background image alt-text: {image.title} in {image.medium}</p>
      </div>
    </>
  );
}
