// Класс валидация формы
export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._formElement  = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }
  // Метод (Включение валидации)
  enableValidation() {
    this._setEventListeners();
  }
  // Метод (Добавление обработчиков)
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleInputErrorState(inputElement);
        this._toggleButtonState();
      });
    });
  }
  // Метод (Проверка валидности)
  _toggleInputErrorState(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };
  }
  // Метод (Изменение кнопки submit)
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButtonState();
    } else {
      this._enableButtonState();
    }
  }
  // Метод (Показ ошибки)
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }
  // Метод (Скрытие ошибки)
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
  // Метод (Проверка всех полей)
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  // Функция (Активация кнопки)
  _enableButtonState() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }
  // Функция (Выключения кнопки)
  disableButtonState() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }
}
