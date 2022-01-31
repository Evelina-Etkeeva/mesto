//функция, добавляющая класс со стилями ошибки ввода
const showFormInputError = (formElement, inputElement, errorMessage, set) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(set.inputErrorClass);
  errorElement.classList.add(set.errorClass);
  errorElement.textContent = errorMessage;
};
//функция, удаляющая класс со стилями ошибки ввода
const hideFormInputError = (formElement, inputElement, set) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(set.inputErrorClass);
  errorElement.classList.remove(set.errorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const checkInputValidity  = (formElement, inputElement, set) => {
  showFormInputError(formElement, inputElement, inputElement.validationMessage, set); //показать сообщение ошибки ввода
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showFormInputError(formElement, inputElement, inputElement.validationMessage, set);
  } else {
    // Если проходит, скроем
    hideFormInputError(formElement, inputElement, set);
  }
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

function makeButtonInactive(buttonElement, btnClass){
  buttonElement.classList.add(btnClass);
  buttonElement.disabled = true;
}

function makeButtonActive(buttonElement, btnClass){
  buttonElement.classList.remove(btnClass);
  buttonElement.disabled = false;
}

const toggleButtonState = (inputList, buttonElement, set) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    makeButtonInactive(buttonElement, set.inactiveButtonClass)
  } else {
    makeButtonActive(buttonElement, set.inactiveButtonClass)
    // иначе сделай кнопку активной
  }
};

const setEventListeners = (formElement, set) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(set.inputSelector));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(set.submitButtonSelector);

    // Обойдём все элементы полученной коллекции
    // каждому полю добавим обработчик события input
    toggleButtonState(inputList, buttonElement, set);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity (formElement, inputElement, set);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        toggleButtonState(inputList, buttonElement, set);

      });
    });
};


const enableValidation = (set) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(set.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, set);
  });
};

// Вызовем функцию
enableValidation({
  formSelector: '.form',
  inputSelector:  '.form__item',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'form__item-error',
  errorClass: 'form__error_active'
});

