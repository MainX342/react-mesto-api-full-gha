export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_image${isOpen ? ' popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__image-container">
        <button className="popup__close-btn" type="button" onClick={onClose}></button>
        <figure className="popup__figure">
          <img src={card.link ? card.link : '#'} alt={card.name ? `Увеличенное изображение ${card.name}` : '#'} className="popup__image-enlarged" />
          <figcaption className="popup__image-figcaption">{card.name || ''}</figcaption>
        </figure>
      </div>
    </div>
  )
}