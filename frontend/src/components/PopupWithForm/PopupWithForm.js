export default function PopupWithForm({
  name,
  title,
  sendingText,
  titleButton,
  children,
  isOpen,
  onClose,
  onSubmit,
  isSending,
  isValid = true,
}) {
  return (
    <div
      className={`popup popup_type_${name}${isOpen ? " popup_opened" : ""}`}
      onMouseDown={onClose}
    >
      <div
        className="popup__container"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="popup__close-btn" type="button" onClick={onClose} />
        <h2
          className={`popup__title${
            name === "delete-card" ? " popup__title_confirm" : ""
          }`}
        >
          {title}
        </h2>
        <form
          className="popup__form"
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className={`popup__save-btn${
              isValid ? "" : " popup__save-btn_disabled"
            }`}
            disabled={isSending}
          >
            {isSending ? sendingText : titleButton || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}
