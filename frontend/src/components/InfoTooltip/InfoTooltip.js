export default function InfoTooltip({ name, isOpen, titleText, onClose }) {

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div
        className="popup__registration-container"
        onClick={(evt) => evt.stopPropagation()}>
        <button type="button" className="popup__close-btn" onClick={onClose} />
        <div className={`popup__registration-image${name === 'error' ? ' popup__registration-image_error' : ''}`} />
        <h2 className="popup__registration-title">{titleText}</h2>
      </div>
    </div>
  )
}
