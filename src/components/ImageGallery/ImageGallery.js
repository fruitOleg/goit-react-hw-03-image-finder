import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <ImageGallery>
      {images.map(image => (
        <ImageGalleryItem image={image} key={image.id} />
      ))}
    </ImageGallery>
  );
};
