import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js"

export default function Card({ card, onCardClick, onDeleteCard, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);

  return (
    <li className="elements__card">
      {isOwn && <button className="elements__delete-btn" type="button" onClick={() => onDeleteCard(card._id)}/>}
      <img src={card.link} alt={`Изображение ${card.name}`} className="elements__image" onClick={() => onCardClick({ link: card.link, name: card.name })}/>
      <div className="elements__description">
        <h2 className="elements__title">{card.name}</h2>
        <button className={`elements__like${isLiked ? ' elements__like_active' : ''}`} type="button" onClick={() => onCardLike(card)}/>
        <span className="elements__like-counter">{card.likes.length}</span>
      </div>
    </li>
  )
}