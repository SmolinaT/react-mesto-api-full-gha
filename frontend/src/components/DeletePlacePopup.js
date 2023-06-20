import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePlacePopup({card, isOpen, onClose, onDeleteCard, isSending}) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onDeleteCard(card);
  }
  
  return (
    <PopupWithForm isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit} 
      title={'Вы уверены?'} 
      name="delete" 
      buttonText={isSending ?'Удаление..' :'Да'}/>
  )
}

export default DeletePlacePopup;