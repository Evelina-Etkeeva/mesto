//функция, добавляющая класс со стилями ошибки ввода
const showFormInputError = (formElement, inputElement, errorMessage, set) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //console.log(`.${inputElement.id}-error`);
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
const isValid = (formElement, inputElement, set) => {
 //console.log(inputElement);
 showFormInputError(formElement, inputElement, inputElement.validationMessage, set); //почему не работает с названием места для новой карточки???
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

const toggleButtonState = (inputList, buttonElement, set) => {
  // Если есть хотя бы один невалидный инпут
  //console.log(set);
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(set.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
    // console.log(set);
  } else {
    // иначе сделай кнопку активной
    //console.log(set);
    buttonElement.classList.remove(set.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'disabled');
  }
};

const setEventListeners = (formElement, set) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(set.inputSelector));
  // console.log(inputList);
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(set.submitButtonSelector);

    // Обойдём все элементы полученной коллекции
    // каждому полю добавим обработчик события input
    //console.log(inputList);
    //console.log(inputElement);
    toggleButtonState(inputList, buttonElement, set);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, set);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        toggleButtonState(inputList, buttonElement, set);

      });
    });
};


const enableValidation = (set) => {
  //console.log(set);
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(set.formSelector));
  //console.log(Array.from(document.querySelectorAll('.form')));

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

