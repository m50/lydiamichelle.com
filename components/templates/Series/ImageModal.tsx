import React from 'react';
import { ImageInfo } from '../../../types/Series';
import Image from 'next/image';
import Head from 'next/head';


interface Props {
  image: ImageInfo;
  onClickAway: () => void;
}

export const ImageModal: React.FC<Props> = ({ image, onClickAway }) => {
  return (
    <figure className="fixed top-0 left-0 w-full h-full z-30">
      <Head>
        <title>{image.title} | Lydia Michelle Art</title>
        <meta property="og:image" content={image.image} />
      </Head>
      <div className="flex justify-center content-center items-center h-full px-2">
        <div className="h-auto sm:h-3/4 lg:h-auto static flex flex-col sm:flex-row md:flex-col lg:flex-row w-auto z-50 bg-theme-gray rounded-xl justify-between">
          <img className="h-auto max-h-screen sm:h-full lg:h-auto rounded-xl" src={image.image} onContextMenu={() => false} />
          <figcaption className="flex flex-col justify-center content-center items-center p-5">
            <cite className="capitalize text-white text-lg xl:text-3xl font-serif">
              <span className="sr-only">Piece: </span>{image.title}
            </cite>
            <small className="capitalize text-white text-sm xl:text-lg">
              <span className="sr-only">Medium: </span>{image.medium}
            </small>
            {image.wip && (
              <small className="capitalize text-theme-pink text-xs xl:text-md">
                Work in Progress
              </small>
            )}
            {image.blurb && (
              <small className="capitalize text-white text-md xl:text-2xl">
                <br />
                {image.blurb}
              </small>
            )}
          </figcaption>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-75 bg-black z-30" onClick={onClickAway}></div>
      </div>
    </figure>
  );
};

export default ImageModal
