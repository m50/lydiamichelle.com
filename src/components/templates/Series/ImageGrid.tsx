import React from 'react';
import { ImageInfo } from '../../../types/Series';
import slugify from 'slugify';

interface Props {
  images: ImageInfo[];
  onImageClick: (image: ImageInfo) => void
}

const captionClasses = `
  top-0 left-0 h-16 xl:h-full w-full xl:absolute transform transition-opacity rounded-xl
  duration-300 ease-in-out text-center xl:opacity-0 hover:opacity-100 text-white
  flex flex-col justify-center -mt-16 xl:mt-0
`;

export const ImageGrid: React.FC<Props> = ({ images, onImageClick }) => {
  return (
    <section className="w-full bg-white" data-turbolinks="false">
      <div className="w-full md:w-2/3 mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-5">
        {images.map((image, idx) => {
          const slug = slugify(image.title, { lower: true, strict: true, locale: 'en' });
          return (
            <div key={slug + idx}>
              <a onClick={() => onImageClick(image)} href={`#${slug}`}>
                <figure className="relative w-full h-88 md:h-64 2xl:h-88 rounded-xl overflow-hidden">
                  <img className="h-full w-full object-cover object-center rounded-xl"
                    src={image.image} alt={image.title} loading="lazy" />
                  <figcaption className={captionClasses} style={{ backgroundColor: "rgba(0,0,0,0.75)" }}>
                    <cite className="text-lg xl:text-3xl font-serif capitalize">
                      <span className="sr-only">Piece: </span>{image.title}
                    </cite>
                    <small className="text-sm xl:text-lg capitalize">
                      <span className="sr-only">Medium: </span>{image.medium}
                    </small>
                  </figcaption>
                </figure>
              </a>
            </div>
          )
        })}
      </div>
    </section>
  );
};

export default ImageGrid;
