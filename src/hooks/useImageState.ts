import { useEffect, useState } from 'react';
import type { ImageInfo, Series } from 'types/Series';
import { slug } from 'lib/helpers';

interface Ret {
  selectedImage: ImageInfo | null;
  // eslint-disable-next-line no-unused-vars
  onImageClick: (image: ImageInfo) => void;
  onOutsideClick: () => void;
}

const useImageState = (series: Series): Ret => {
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);

  useEffect(() => {
    if (window.location.hash) {
      const image = series.images.find((i) => `#${slug(i.title)}` === window.location.hash);
      if (image) {
        setSelectedImage(image);
      }
    }
  }, [series.images]);

  const onImageClick = (image: ImageInfo) => {
    const imageSlug = slug(image.title);
    window.location.hash = `#${imageSlug}`;
    setSelectedImage(image);
  };
  const onOutsideClick = () => {
    setSelectedImage(null);
    window.history.pushState('', document.title,
      window.location.pathname + window.location.search);
  };

  return { selectedImage, onImageClick, onOutsideClick };
};

export default useImageState;
