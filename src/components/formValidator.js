 export class FormValidator{
  constructor(dict, formElement){
    this._dict = dict;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._dict.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._dict.submitButtonSelector);
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

  _hasInvalidInput(){
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  };

  _makeButtonInactive(){
    this._buttonElement.classList.add(this._dict.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _makeButtonActive(){
    this._buttonElement.classList.remove(this._dict.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _toggleButtonState(){
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this._makeButtonInactive()
    } else {
      this._makeButtonActive()
      // иначе сделай кнопку активной
    }
  };

  _setEventListeners(){
    // Найдём в текущей форме кнопку отправки

      // Обойдём все элементы полученной коллекции
      // каждому полю добавим обработчик события input
      this._toggleButtonState();
   
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {

          this._checkInputValidity (inputElement);
          // Вызовем toggleButtonState и передадим ей массив полей и кнопку
          this._toggleButtonState();

        });
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._makeButtonInactive();
          });
      });
  };

  enableValidation(){
    this._setEventListeners();
  }

}

