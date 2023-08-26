import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormValidation from "../../utils/useFormValidation";
import { useEffect } from "react";

export default function AddPlacePopup({ isOpen, onClose, isSending, onAddPlace }) {
  const { values, errors, isInputValid, isValid, handleChange, resetForm } = useFormValidation();

  useEffect(() => {
    isOpen && resetForm()
  }, [isOpen, resetForm])

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      titleButton="Создать"
      sendingText="Добавление..."
      isOpen={isOpen}
      onClose={onClose}
      isSending={isSending}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          type="text"
          className={`popup__input popup__input_field_name-place${
            isInputValid.name === undefined || isInputValid.name ? '' : ' popup__input_type_error'
          }`}
          placeholder="Название"
          name="name"
          id="name"
          minLength={2}
          maxLength={30}
          required
          value={values.name ? values.name : ''}
          disabled={isSending}
          onChange={handleChange}
        />
        <span className="popup__error popup__error_type_name">{errors.name}</span>
      </div>
      <div className="popup__field">
        <input
          type="url"
          className={`popup__input popup__input_field_link${
            isInputValid.link === undefined || isInputValid.link ? '' : ' popup__input_type_error'
          }`}
          placeholder="Ссылка на картинку"
          name="link"
          id="link"
          required
          value={values.link ? values.link : ''}
          disabled={isSending}
          onChange={handleChange}
        />
        <span className="popup__error popup__error_type_link">{errors.link}</span>
      </div>
    </PopupWithForm>
  );
}
