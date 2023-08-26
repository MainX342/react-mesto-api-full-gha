import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useEffect } from "react";

export default function EditAvatarPopup({ isOpen, onClose, isSending, onUpdateAvatar }) {
  const { values, errors, isInputValid, isValid, handleChange, resetForm } = useFormValidation();

  useEffect(() => {
    isOpen && resetForm()
  }, [isOpen, resetForm])

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: values.avatar });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      sendingText="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      isSending={isSending}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          type="url"
          className={`popup__input popup__input_field_link${isInputValid.avatar === undefined || isInputValid.avatar ? '' : ' popup__input_type_error'}`}
          placeholder="Ссылка на картинку"
          name="avatar"
          id="avatar"
          required
          value={values.avatar ? values.avatar : ''}
          disabled={isSending}
          onChange={handleChange}
        />
        <span className="popup__error popup__error_type_avatar">{errors.avatar}</span>
      </div>
    </PopupWithForm>
  );
}
