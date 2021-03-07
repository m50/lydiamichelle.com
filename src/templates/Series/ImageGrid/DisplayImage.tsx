import { Image } from 'components/Image';
import { slug } from 'lib/helpers';
import React from 'react';
import { ImageInfo } from 'types/Series';

interface Props {
  image: ImageInfo;
  onImageClick: (image: ImageInfo) => void;
}

const captionClasses = `
  top-0 left-0 h-16 xl:h-full w-full xl:absolute transform transition-opacity rounded-xl
  duration-300 ease-in-out text-center xl:opacity-0 hover:opacity-100 text-white
  flex flex-col justify-center -mt-16 xl:mt-0 rounded-t-none
`;

export const DisplayImage: React.FC<Props> = ({ image, onImageClick }) => {
  const imageSlug = slug(image.title);
  return (
    <div>
      <a onClick={() => onImageClick(image)} href={`#${imageSlug}`}>
        <figure className="relative w-full h-88 md:h-64 2xl:h-88 rounded-xl overflow-hidden">
          <Image className="h-full w-full object-cover object-center rounded-xl"
            paths={image.image} alt={image.title} loading="lazy" height={400}
          />
          <figcaption className={captionClasses} style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}>
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
  );
};

export default DisplayImage;
