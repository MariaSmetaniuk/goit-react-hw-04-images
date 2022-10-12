import { Component } from 'react';
import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    const { cards, openModal } = this.props;
    return (
      <Gallery>
        {cards.map(({ id, webformatURL }) => (
          <ImageGalleryItem
            key={id}
            itemId={id}
            webformatURL={webformatURL}
            openModal={openModal}
          />
        ))}
      </Gallery>
    );
  }
}

ImageGallery.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
  openModal: PropTypes.func.isRequired,
};
