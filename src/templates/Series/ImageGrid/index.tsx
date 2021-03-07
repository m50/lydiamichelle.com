import React from 'react';
import type { ImageInfo } from '../../../types/Series';
import { DisplayImage } from './DisplayImage';

interface Props {
  images: ImageInfo[];
  onImageClick: (image: ImageInfo) => void
}

const classNames = `
  w-full mx-auto grid grid-cols-1 gap-4 p-5
  md:w-2/3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
`;

export const ImageGrid: React.FC<Props> = ({ images, onImageClick }) => (
  <section className="w-full bg-white" data-turbolinks="false">
    <div className={classNames}>
      {images.map((image, idx) => (
        <DisplayImage image={image} onImageClick={onImageClick} key={idx} />
      ))}
    </div>
  </section>
);

export default ImageGrid;
