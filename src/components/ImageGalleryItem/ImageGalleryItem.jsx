import PropTypes from 'prop-types';
import { Item, ItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ itemId, webformatURL, openModal }) => {
  return (
    <Item
      onClick={() => {
        openModal(itemId);
      }}
    >
      <ItemImg src={webformatURL} alt="" />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  itemId: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
