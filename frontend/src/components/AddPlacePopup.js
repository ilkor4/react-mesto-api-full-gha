import { useState } from "react";
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameState(e) {
    setName(e.target.value);
  }

  function handleLinkState(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace(name, link);
  }

  return(
    <PopupWithForm name="add" title="Новое место" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
       <input onChange={handleNameState} value={name} placeholder="Название" id="input-title" name="name" required className="form__input form__input_type_name" type="text" minLength="2" maxLength="30" />
       <span className="form__input-error input-title-error"></span>
       <input onChange={handleLinkState} value={link} placeholder="Ссылка на картинку" type="url" id="inputLink" name="link" required className="form__input form__input_type_link" />
       <span className="form__input-error inputLink-error"></span>
     </PopupWithForm>
  )
}

export default AddPlacePopup;
