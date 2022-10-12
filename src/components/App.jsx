import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { GetImages } from '../services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Notification } from './Notification/Notification';
import { LoadMoreButton } from './Button/Button';
import { AppContainer } from './App.styled';

export class App extends Component {
  state = {
    query: null,
    cards: [],
    page: 1,
    per_page: 12,
    totalPages: 0,
    isLoading: false,
    modal: {
      status: false,
      content: '',
    },
    error: {
      status: false,
      message: '',
    },
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.handleFetchImages();
    }
  }

  handleFetchImages = async () => {
    const { query, page, per_page } = this.state;
    try {
      this.setState({ isLoading: true });

      const data = await GetImages(query, page, per_page);

      if (data.hits.length === 0) {
        this.setState({
          error: {
            status: true,
            message: `Sorry, there are no images matching ${query}. Please try again.`,
          },
        });
        return;
      }

      const totalPages = Math.ceil(data.totalHits / per_page);

      this.setState(prevState => {
        return {
          cards: [...prevState.cards, ...data.hits],
          totalPages,
        };
      });
    } catch (error) {
      this.setState({
        error: {
          status: true,
          message: 'Something went wrong :( Please try again later!',
        },
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleSubmit = query => {
    this.setState({
      cards: [],
      query,
      page: 1,
      error: {
        status: false,
        message: '',
      },
    });
  };

  handleOpenModal = cardId => {
    const currentCard = this.state.cards.find(card => card.id === cardId);

    this.setState({
      modal: {
        status: true,
        content: currentCard.largeImageURL,
      },
    });
  };

  handleCloseModal = () => {
    this.setState({
      modal: {
        status: false,
        content: '',
      },
    });
  };

  render() {
    const { cards, page, totalPages, isLoading, modal, error } = this.state;
    const { handleSubmit, handleOpenModal, handleCloseModal, handleLoadMore } =
      this;
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
  }
}
