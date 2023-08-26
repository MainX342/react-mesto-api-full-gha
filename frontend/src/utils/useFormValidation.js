import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isInputValid, setIsInputValid] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const {
      name,
      value,
      validationMessage,
      validity: { valid },
      form,
    } = evt.target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setIsInputValid({ ...isInputValid, [name]: valid });
    setIsValid(form.checkValidity());
  }

  const resetForm = useCallback((data = {}) => {
    setValues(data);
    setErrors({});
    setIsInputValid({});
    setIsValid(false);
  },[]);

  const setValue = useCallback((name, value) => {
    setValues((oldValues) => {
      return { ...oldValues, [name]: value };
    });
  }, []);

  return {
    values,
    errors,
    isInputValid,
    isValid,
    handleChange,
    resetForm,
    setValue,
  };
}
