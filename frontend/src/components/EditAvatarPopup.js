import PopupWithForm from "./PopupWithForm"
import { useRef } from "react";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(avatarRef.current.value)
  }

  return(
    <PopupWithForm onSubmit={handleSubmit} name="avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose}>
      <input ref={avatarRef} placeholder="Ссылка на картинку" type="url" id="input-link" name="avatar" required className="form__input form__input_type_link" />
      <span className="form__input-error input-link-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
