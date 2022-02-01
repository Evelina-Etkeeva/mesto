class FormValidator{
  constructor(dict, formElement){
    this._dict = dict;
    this._formElement = formElement;
  }

  //функция, добавляющая класс со стилями ошибки ввода
  _showFormInputError(inputElement, errorMessage){
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._dict.inputErrorClass);
    errorElement.classList.add(this._dict.errorClass);
    errorElement.textContent = errorMessage;
  };
  //функция, удаляющая класс со стилями ошибки ввода
  _hideFormInputError(inputElement){
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._dict.inputErrorClass);
    errorElement.classList.remove(this._dict.errorClass);
    errorElement.textContent = '';
  };

  // Функция, которая проверяет валидность поля
  _checkInputValidity(inputElement){
    this._showFormInputError(inputElement, inputElement.validationMessage); //показать сообщение ошибки ввода
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showFormInputError(inputElement, inputElement.validationMessage);
    } else {
      // Если проходит, скроем
      this._hideFormInputError(inputElement);
    }
  };

  _hasInvalidInput(inputList){
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  };

  _makeButtonInactive(buttonElement, btnClass){
    buttonElement.classList.add(btnClass);
    buttonElement.disabled = true;
  }

  _makeButtonActive(buttonElement, btnClass){
    buttonElement.classList.remove(btnClass);
    buttonElement.disabled = false;
  }

  _toggleButtonState(inputList, buttonElement){
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      this._makeButtonInactive(buttonElement, this._dict.inactiveButtonClass)
    } else {
      this._makeButtonActive(buttonElement, this._dict.inactiveButtonClass)
      // иначе сделай кнопку активной
    }
  };


  _setEventListeners(){
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(this._formElement.querySelectorAll(this._dict.inputSelector));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = this._formElement.querySelector(this._dict.submitButtonSelector);

      // Обойдём все элементы полученной коллекции
      // каждому полю добавим обработчик события input
      this._toggleButtonState(inputList, buttonElement);

      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {

          this._checkInputValidity (inputElement);
          // Вызовем toggleButtonState и передадим ей массив полей и кнопку
          this._toggleButtonState(inputList, buttonElement);

        });
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
          });
      });
  };

  enableValidation(){

    this._setEventListeners();
  }

}

const validationDict = {
  formSelector: '.form',
  inputSelector:  '.form__item',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'form__item-error',
  errorClass: 'form__error_active'
}

const formList = Array.from(document.querySelectorAll(validationDict.formSelector));
formList.forEach((formElement) => {
  const form = new FormValidator(validationDict, formElement);
  form.enableValidation();
});
