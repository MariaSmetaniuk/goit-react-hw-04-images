import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import {
  SearchbarHeader,
  SearchForm,
  SearchButton,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    const { value } = e.currentTarget;
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const searchQuery = query.trim();

    if (searchQuery !== '') {
      onSubmit(searchQuery);
    }
    reset();
  };

  const reset = () => {
    setQuery('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <FaSearch />
          <ButtonLabel>Search</ButtonLabel>
        </SearchButton>

        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
