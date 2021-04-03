import React from 'react';
import useImageState from 'hooks/useImageState';
import type { Series } from 'collections/series/Series';
import Head from 'next/head';
import Header from './Header';
import Body from './Body';
import ImageGrid from './ImageGrid';
import ImageModal from './ImageModal';

export const SeriesTemplate: React.FC<Series> = (series) => {
  const { selectedImage, onImageClick, onOutsideClick } = useImageState(series);

  return (
    <article className="h-full">
      <Head>
        <title>{series.title} | Lydia Michelle Art</title>
        <meta property="og:title" content={series.title} />
        <meta property="og:description" content={series.excerpt} />
        <meta property="og:image:height" content="400" />
        <meta property="og:type" content="article" />
        {!selectedImage && series.images.map((image) => (
          <meta key={image.title} property="og:image" content={`https://lydiamichelle.art${image.image.half}`} />
        ))}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={`https://lydiamichelle.art${series.images[0].image.half}`} />
        <meta property="twitter:image:alt"
          content={`${series.images[0].title} - ${(series.images[0].blurb || series.images[0].medium)}`}
        />
      </Head>
      <Header {...series} />
      <Body content={series.body} />
      <ImageGrid images={series.images} onImageClick={onImageClick} />
      {selectedImage && <ImageModal onClickAway={onOutsideClick} image={selectedImage} />}
    </article>
  );
};

export default SeriesTemplate;
