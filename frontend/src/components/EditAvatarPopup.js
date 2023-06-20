import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isSending}) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm isOpen={isOpen} 
      title='Обновить аватар' 
      name='avatar' 
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isSending ?'Сохранение..' : 'Сохранить'}>
      <input type="url" ref={avatarRef} required className="popup__text popup__text_type_link" placeholder="Ссылка на аватар" id="editAvatarLink" name="avatar"/>
      <span id='editAvatarLink-error' className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;