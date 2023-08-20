import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  return (
    <Header>
      <SearchForm
        onSubmit={event => {
          event.preventDefault();
          onSubmit(event.target.elements.query.value);
          event.target.reset();
        }}
      >
        <SearchFormButton type="submit"></SearchFormButton>
        <SearchFormInput
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};
