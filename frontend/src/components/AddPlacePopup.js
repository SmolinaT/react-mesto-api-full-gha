import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace, isSending}) {
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: title,
      link,
    });
  }

  React.useEffect(() => {
    setTitle('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm isOpen={isOpen} 
      title={'Новое место'} 
      name={'mesto'} 
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isSending ?'Сохранение..' : 'Создать'}>
      <input type="text" value={title || ''} onChange={handleChangeTitle} required className="popup__text popup__text_type_title" placeholder="Название" id="editTitle" name="name" minLength="2" maxLength="30"/>
      <span id='editTitle-error' className="popup__input-error"></span>
      <input type="url" value={link || ''} onChange={handleChangeLink} required className="popup__text popup__text_type_link" placeholder="Ссылка на картинку" id="editLink" name="link"/>
      <span id='editLink-error' className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;