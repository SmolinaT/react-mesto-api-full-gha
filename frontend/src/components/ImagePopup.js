import usePopupClose from "../hooks/usePopupClose";

function ImagePopup({card, onClose, isOpen}) {
  usePopupClose(isOpen, onClose)

  return (
    <div className={`popup popup_name_photo ${card.link ? 'popup_opened' : ''}`}>
      <figure className="popup__image-container">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <img className="popup__image" src={card.link} alt={card.name}/>
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;