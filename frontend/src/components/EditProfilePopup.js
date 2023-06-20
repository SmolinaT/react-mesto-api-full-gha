import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser, isSending}) {
  const [name, setName] = React.useState('Пользователь');
  const [description, setDescription] = React.useState('О себе');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm isOpen={isOpen} 
      title={'Редактировать профиль'} 
      name={'profile'} 
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isSending ?'Сохранение..' : 'Сохранить'}>
      <input type="text" value={name || ''} onChange={handleChangeName} required className="popup__text popup__text_type_name" placeholder="Введите имя" id="editName" name="name" minLength="2" maxLength="40" autoComplete="off"/>
      <span id='editName-error' className="popup__input-error"></span>
      <input type="text" value={description || ''} onChange={handleChangeAbout} required className="popup__text popup__text_type_job" placeholder="Чем Вы занимаетесь?" id="editJob" name="about" minLength="2" maxLength="200"/>
      <span id='editJob-error' className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;