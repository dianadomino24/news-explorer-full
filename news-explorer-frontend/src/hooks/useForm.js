import { useCallback, useState } from 'react';

export default function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const { target } = evt;
    const { name } = target;
    if (name === 'password') {
      const value = target.value.trim().replace(/\s/g, '');
      setValues({ ...values, [name]: value });
      setErrors({ ...errors, [name]: target.validationMessage });
    } else {
      const value = target.value.trim();
      setValues({ ...values, [name]: value });
      setErrors({ ...errors, [name]: target.validationMessage });
    }
    setIsValid(evt.target.closest('form').checkValidity());
  };
  const resetForm = useCallback(() => {
    setValues({});
    setErrors({});
    setIsValid(false);
  }, []);

  return {
    values,
    setValues,
    handleChange,
    errors,
    resetForm,
    isValid,
  };
}
