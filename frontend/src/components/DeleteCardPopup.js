import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onDeleteCard(props.card);
  }

  return(
    <PopupWithForm name="delete" buttonText="Да" title="Вы уверены?" onClose={props.onClose} onSubmit={handleSubmit} isOpen={props.isOpen}></PopupWithForm>
  )
}

export default DeleteCardPopup;
