import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return(
    <main className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__image" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${ currentUser ? currentUser.avatar : '' })` }}></div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__name">{ currentUser ? currentUser.name : '' }</h1>
            <button className="profile__edit-button" type="button" onClick={props.onEditProfile} aria-label="Кнопка редактирования"></button>
          </div>
          <p className="profile__signature">{ currentUser ? currentUser.about : '' }</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace} aria-label="Кнопка добавления карточки"></button>
      </section>
      <section aria-label="Элементы">
        <ul className="elements">
          {props.cards.map((cardConfig) => (
          <Card
            card={cardConfig}
            key={cardConfig._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onDeleteCardOpen={props.onDeleteCardOpen}
            onSelectCard={props.onSelectCard}
          />
          ))
          }
        </ul>
      </section>
    </main>
  )
}

export default Main;
