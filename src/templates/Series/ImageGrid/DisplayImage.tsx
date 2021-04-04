import { Image } from 'components/Image';
import { cl, slug } from 'lib/helpers';
import React from 'react';
import { ImageInfo } from 'collections/series/Series';
import { Remark } from 'react-remark';
import remarkGemoji from 'remark-gemoji';

interface Props {
  image: ImageInfo;
  onImageClick: (image: ImageInfo) => void;
}

const captionClasses = cl`
  top-0 left-0 h-auto w-full transform transition-opacity rounded-xl
  duration-300 ease-in-out text-center text-white
  flex flex-col justify-center -mt-16 rounded-t-none
  hover:opacity-100
  lg:h-full lg:mt-0 lg:absolute lg:opacity-0
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
            {image.blurb && (
              <small className="lg:block hidden">
                <section className="prose prose-sm text-white">
                  <Remark remarkPlugins={[remarkGemoji]}>{image.blurb}</Remark>
                </section>
              </small>
            )}
          </figcaption>
        </figure>
      </a>
    </div>
  );
};

export default DisplayImage;
