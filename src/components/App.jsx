import { useState, useEffect, useRef } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { GetImages } from '../services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Notification } from './Notification/Notification';
import { LoadMoreButton } from './Button/Button';
import { AppContainer } from './App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({
    status: false,
    content: '',
  });
  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    handleFetchImages(query, page, per_page);
  }, [page, per_page, query]);

  const handleFetchImages = async (query, page, per_page) => {
    try {
      setIsLoading(true);

      const data = await GetImages(query, page, per_page);

      if (data.hits.length === 0) {
        setError({
          status: true,
          message: `Sorry, there are no images matching ${query}. Please try again.`,
        });
        return;
      }

      const totalPages = Math.ceil(data.totalHits / per_page);

      setCards(prev => [...prev, ...data.hits]);
      setTotalPages(totalPages);
    } catch (error) {
      setError({
        status: true,
        message: 'Something went wrong :( Please try again later!',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleOpenModal = cardId => {
    const currentCard = cards.find(card => card.id === cardId);

    setModal({
      status: true,
      content: currentCard.largeImageURL,
    });
  };

  const handleCloseModal = () => {
    setModal({
      status: false,
      content: '',
    });
  };

  const handleSubmit = query => {
    setQuery(query);
    setCards([]);
    setPage(1);
    setError({
      status: false,
      message: '',
    });
  };

  const isCards = cards.length > 0;
  const isModalOpen = modal.status;
  const modalContent = modal.content;
  const showError = error.status && !isLoading;
  const errorMessage = error.message;
  const buttonVisible = isCards && page < totalPages && !isLoading;

  return (
    <AppContainer>
      <Searchbar onSubmit={handleSubmit} />
      {showError && <Notification message={errorMessage} />}
      {isCards && <ImageGallery cards={cards} openModal={handleOpenModal} />}
      {isLoading && <Loader />}
      {buttonVisible && <LoadMoreButton onClick={handleLoadMore} />}
      {isModalOpen && (
        <Modal largeImageURL={modalContent} closeModal={handleCloseModal} />
      )}
      <GlobalStyle />
    </AppContainer>
  );
};
