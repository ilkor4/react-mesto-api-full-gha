import accessTrueImage  from '../images/access-true.svg'
import accessFalseImage from '../images/access-false.svg'
import "./styles/InfoTooltip.css"

function InfoTooltip(props) {
  return(
    <div className={`popup popup_type_info-tooltip ${((props.isOpen) ? 'popup_opened' : '')}`}>
      <div className="popup__container popup__container_type_info-tooltip">
        <button className="popup__close-button" type="button" onClick={props.onClose} aria-label="Кнопка закрытия попапа"></button>
        <img src={props.access ? accessTrueImage : accessFalseImage} alt="иконка успешности регистрации"/>
        <h2 className='popup__title'>{props.access ? 'Вы успешно зарегистрировались' : "Что-то пошло не так! Попробуйте ещё раз." }</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;
