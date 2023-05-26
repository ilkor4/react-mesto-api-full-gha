function PopupWithForm(props) {
  return(
    <div className={`popup popup_type_${props.name} ${((props.isOpen) ? 'popup_opened' : '')}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={props.onClose} aria-label="Кнопка закрытия попапа"></button>
        <form className="form" name={props.name}  onSubmit={props.onSubmit}>
          <legend className="form__title">{props.title}</legend>
          <>{props.children} </>
        <button className="form__save-button" type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
