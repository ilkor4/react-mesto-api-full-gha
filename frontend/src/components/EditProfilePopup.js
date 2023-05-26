import PopupWithForm from './PopupWithForm.js';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    currentUser && setName(currentUser.name);
    currentUser && setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameState(e) {
    setName(e.target.value);
  }

  function handleDescriptionState(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser(name, description);
  }

  return(
    <PopupWithForm name="edit" title="Редактировать профиль" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input value={name} onChange={handleNameState} placeholder="Имя" name="inputName" id="input-name" required className="form__input form__input_type_name" type="text" minLength="2" maxLength="40" />
      <span className="form__input-error input-name-error"></span>
      <input value={description} onChange={handleDescriptionState} placeholder="О себе" id="input-signature" name="inputSignature" required type="text" className="form__input form__input_type_signature" minLength="2" maxLength="200" />
      <span className="form__input-error input-signature-error form__input-error_type_margin"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
