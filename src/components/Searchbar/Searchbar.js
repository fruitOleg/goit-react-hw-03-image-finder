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
        onSubmit={evt => {
          evt.preventDefault();
          onSubmit(evt.target.elements.query.value);
          evt.target.reset();
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
