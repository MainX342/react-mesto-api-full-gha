import { useContext, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, isSending, onUpdateUser }) {
  const { values, errors, isInputValid, isValid, handleChange, resetForm } = useFormValidation();
  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    if (currentUser.name) {
      resetForm({ username: currentUser.name, description: currentUser.about })
    }
  },[currentUser, isOpen, resetForm])

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      sendingText="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      isSending={isSending}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          type="text"
          className={`popup__input popup__input_field_name${
            isInputValid.username === undefined || isInputValid.username ? '' : ' popup__input_type_error'
          }`}
          placeholder="Имя"
          name="username"
          id="username"
          minLength={2}
          maxLength={40}
          required
          value={values.username ? values.username : ''}
          disabled={isSending}
          onChange={handleChange}
        />
        <span
          className="popup__error popup__error_type_username"
        >
          {errors.username}
        </span>
      </div>
      <div className="popup__field">
        <input
          type="text"
          className={`popup__input popup__input_field_description${
            isInputValid.description === undefined || isInputValid.description ? '' : ' popup__input_type_error'
          }`}
          placeholder="Описание"
          name="description"
          id="description"
          minLength={2}
          maxLength={200}
          required
          value={values.description ? values.description : ''}
          disabled={isSending}
          onChange={handleChange}
        />
        <span
          className="popup__error popup__error_type_description"
        >
          {errors.description}
        </span>
      </div>
    </PopupWithForm>
  );
}
