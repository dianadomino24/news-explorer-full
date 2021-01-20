import './SearchForm.css';
import { useState } from 'react';
import Button from '../Button/Button';
import useForm from '../../hooks/useForm';

function SearchForm({ handleSearch }) {
  const warningMessage = 'Please, fill in a keyword';
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const {
    values,
    handleChange,
    resetForm,
  } = useForm();

  const handleFocus = () => {
    setIsInputEmpty(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const keyword = e.target.searchForm.value;
    if (!keyword.replace(/\s/g, '').trim().length) {
      e.target.searchForm.value = '';
      setIsInputEmpty(true);
      resetForm();
      return;
    }
    // !!!!!!!! temporary
    handleSearch(keyword);
  };

  return (
        <form className="search-form" onSubmit={handleSubmit} noValidate>
            <input
                type="text"
                name="searchForm"
                value={values.search}
                className={`search-form__input ${isInputEmpty && 'search-form__input_warning'}`}
                placeholder={isInputEmpty ? warningMessage : 'Fill in the search keywords'}
                required
                onFocus={handleFocus}
                onChange={handleChange}
            />
            <Button buttonClasses="button_type_text button_type_submit search-form__button" type="submit">
                Search
            </Button>
        </form>
  );
}

export default SearchForm;
