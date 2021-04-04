import React from 'react';
import type { ImageInfo } from 'collections/series/Series';
import Head from 'next/head';
import { Image } from 'components/Image';
import { cl } from 'lib/helpers';
import { Remark } from 'react-remark';
import remarkGemoji from 'remark-gemoji';

interface Props {
  image: ImageInfo;
  onClickAway: () => void;
}

export const ImageModal: React.FC<Props> = ({ image, onClickAway }) => (
  <figure className="fixed top-0 left-0 w-full h-full z-30">
    <Head>
      <title>{image.title} | Lydia Michelle Art</title>
      <meta property="og:title" content={image.title} />
      <meta property="og:description" content={image.blurb || image.medium} />
      <meta property="twitter:image:alt" content={`${image.title} - ${image.blurb || image.medium}`} />
      {!image.extLink && <meta property="og:image" content={`https://lydiamichelle.art${image.image.half}`} />}
      {!image.extLink && <meta property="twitter:image" content={`https://lydiamichelle.art${image.image.half}`} />}
      <meta property="og:image:height" content="400" />
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary_large_image" />
    </Head>
    <div className="flex justify-center content-center items-center h-full px-2" role="dialog">
      <div className={cl`
        h-auto static flex flex-col w-auto z-50 bg-theme-gray rounded-xl justify-between
        sm:h-3/4 lg:h-auto sm:flex-row md:flex-col lg:flex-row
      `}
      >
        {
          image.extLink ? (
            <a href={image.extLink} target="_blank" rel="noreferrer">
              <Image className="h-auto max-h-screen sm:h-full md:h-2/3 xl:h-auto rounded-xl"
                paths={image.image} onContextMenu={() => false}
              />
            </a>
          ) : (
            <Image className="h-auto max-h-screen sm:h-full md:h-2/3 xl:h-auto rounded-xl"
              paths={image.image} onContextMenu={() => false}
            />
          )
        }
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
            <small>
              <br />
              <section className="prose xl:prose-2xl text-white">
                <Remark remarkPlugins={[remarkGemoji]}>{image.blurb}</Remark>
              </section>
            </small>
          )}
        </figcaption>
      </div>
      <div className="absolute top-0 left-0 w-full h-full opacity-75 bg-black z-30"
        onClick={onClickAway} onKeyPress={(e) => e.key === 'Escape' && onClickAway()}
        role="button" aria-label="Close Image" tabIndex={0}
      />
    </div>
  </figure>
);

export default ImageModal;
