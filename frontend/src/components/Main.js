import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const cardsElements = cards.map((card) => (
    <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
  ))

  return (
    <main className="content">
      <section className="profile" aria-label="Профиль пользователя">
        <div className="profile__photo">
          <div className="profile__overlay" onClick={onEditAvatar}></div>
          <img className="profile__avatar" src={currentUser.avatar} alt="Фото пользователя"/>
        </div>
        <div className="profile__information">
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__text">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="photocards" aria-label="Стена с фотокарточками">
        <ul className="cards">
        </ul>
      </section>

      <section className="cards">
        {cardsElements}      
      </section>
    </main>
  );
}

export default Main;