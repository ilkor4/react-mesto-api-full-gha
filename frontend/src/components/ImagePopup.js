function ImagePopup(props) {
  return(
    <div className={`popup popup_type_photo ${(!!props.card) ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Кнопка закрытия попапа" onClick={props.onClose}></button>
        <img src={ props.card ? props.card.link : ''} alt={(!!props.card) ? props.card.name : ''} className="popup__image" />
        <h3 className="popup__title"></h3>
      </div>
    </div>
  )
}

export default ImagePopup;
