import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__heart ${isLiked && 'element__heart_type_active'}`);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteCard() {
    props.onDeleteCardOpen();
    props.onSelectCard(props.card);
  }

  return(
    <li className="element">
      <div  className="element__image" style={{backgroundImage: `url(${props.card.link})`}} onClick={handleClick}></div>
      { isOwn && <button className="element__delete-button" onClick={handleDeleteCard} type="button" aria-label="Кнопка удаления карточки"></button>}
      <div className="element__wrapper">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like">
          <button className={cardLikeButtonClassName} type="button" aria-label="Кнопка лайка" onClick={handleLikeClick}></button>
          <p className="element__amount">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;
