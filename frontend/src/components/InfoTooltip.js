import React from "react";
import popupOk from '../images/icon-ok.png';
import popupError from '../images/icon-error.png';

function InfoTooltip({isOpen, onClose, isSignIn}) {
  const icon = isSignIn ? popupOk : popupError;
    const content = isSignIn
        ? "Вы успешно зарегистрировались!"
        : "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
    <div className="popup__container">
      <button className="popup__close-button" type="button" onClick={onClose}></button>
      <img className="popup__icon" src={icon} alt='Картинка, отображающая статус регистрации' />
      <h2 className="popup__title-toollip">{content}</h2>
    </div>
  </div>
  )
}

export default InfoTooltip;