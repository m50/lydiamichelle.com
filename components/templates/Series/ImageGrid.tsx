import React from 'react';
import { ImageInfo } from '../../../types/Series';
import Image from 'next/image'

export const ImageGrid: React.FC<{ images: ImageInfo[] }> = ({ images }) => {
  return (
    <section className="w-full bg-white" data-turbolinks="false">
      <div className="w-full md:w-2/3 mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-5">
        {/* Loop throw images and add them here. */}
      </div>
    </section>
  );
};

export default ImageGrid;
