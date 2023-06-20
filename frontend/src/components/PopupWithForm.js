import usePopupClose from "../hooks/usePopupClose";

function PopupWithForm({title, name, isOpen, children, onClose, buttonText, onSubmit}) {
  usePopupClose(isOpen, onClose)


  return (
    <div className={`popup popup_name_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__content popup__content_name_${name}`} onSubmit={onSubmit} action="#" name={`popup_form_${name}`} >
          {children}
          <button type="submit" className="popup__submit" name="saveButton">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;