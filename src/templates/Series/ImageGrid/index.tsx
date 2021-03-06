import React from 'react';
import type { ImageInfo } from '../../../types/Series';
import slugify from 'slugify';
import { Image } from 'components/Image';
import { DisplayImage } from './DisplayImage';

interface Props {
  images: ImageInfo[];
  onImageClick: (image: ImageInfo) => void
}

export const ImageGrid: React.FC<Props> = ({ images, onImageClick }) => {
  return (
    <section className="w-full bg-white" data-turbolinks="false">
      <div className="w-full md:w-2/3 mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-5">
        {images.map((image, idx) => <DisplayImage image={image} onImageClick={onImageClick} key={idx} />)}
      </div>
    </section>
  );
};

export default ImageGrid;
