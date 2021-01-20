import './SearchForm.css';
import { useState } from 'react';
import Button from '../Button/Button';

function SearchForm({ setSearchState }) {
  const warningMessage = 'Please, fill in a keyword';
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const handleFocus = () => {
    setIsInputEmpty(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.searchForm.value.trim()) {
      setIsInputEmpty(true);
      return;
    }
    // !!!!!!!! temporary
    setSearchState('found');
  };

  return (
        <form className="search-form" onSubmit={handleSubmit} noValidate>
            <input
                type="text"
                name="searchForm"
                className={`search-form__input ${isInputEmpty && 'search-form__input_warning'}`}
                placeholder={isInputEmpty ? warningMessage : 'Fill in the search keywords'}
                required
                onFocus={handleFocus}
            />
            <Button buttonClasses="button_type_text button_type_submit search-form__button" type="submit">
                Search
            </Button>
        </form>
  );
}

export default SearchForm;
