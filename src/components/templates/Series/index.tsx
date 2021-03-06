import React, { useState, useEffect } from 'react';
import { ImageInfo, Series } from '../../../types/Series';
import Head from 'next/head';
import Header from './Header';
import Body from './Body';
import ImageGrid from './ImageGrid';
import ImageModal from './ImageModal';
import slugify from 'slugify';

const slug = (i: string) => slugify(i, { lower: true, strict: true, locale: 'en' });

export const SeriesTemplate: React.FC<Series> = (series) => {
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);

  useEffect(() => {
    if (window.location.hash) {
      const image = series.images.find((i) => '#' + slug(i.title) === window.location.hash);
      if (image) {
        setSelectedImage(image);
      }
    }
  }, [series.images]);

  const onImageClick = (image: ImageInfo) => {
    setSelectedImage(image);
  };
  const onOutsideClick = () => {
    setSelectedImage(null);
    window.history.pushState("", document.title,
      window.location.pathname + window.location.search);
  }
  return (
    <article className="h-full">
      <Head>
        <title>{series.title} | Lydia Michelle Art</title>
        <meta property="og:title" content={series.title} />
        <meta property="og:description" content={series.excerpt} />
        <meta property="og:image:height" content="400" />
        <meta property="og:type" content="article" />
        {series.images.map((image) => (
          <meta key={image.title} property="og:image" content={`https://lydiamichelle.art${image.image.half}`} />
        ))}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={series.images[0].image.half} />
        <meta property="twitter:image:alt"
          content={series.images[0].title + " - " + (series.images[0].blurb || series.images[0].medium)}
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
