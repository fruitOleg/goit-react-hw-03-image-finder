import { StyledImageGalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  return (
    <StyledImageGalleryItem>
      <a href={image.largeImageURL}>
        <img src={image.webformatURL} alt="" />
      </a>
    </StyledImageGalleryItem>
  );
};
