import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
    `cards__button ${isLiked && 'cards__button_active'}` 
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div className="cards__item">
      <img className="cards__image" src={card.link} alt={card.name} onClick={handleClick}/>
      {isOwn && <button className="cards__delete" type="button" onClick={handleDeleteClick} />}
      <div className="cards__label">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__like">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
          <p className="cards__like-number">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;