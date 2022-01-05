//функция, добавляющая класс со стилями ошибки ввода
const showFormInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //console.log(`.${inputElement.id}-error`);
  inputElement.classList.add('form__item-error');
  errorElement.classList.add('form__error_active');
  errorElement.textContent = errorMessage;
};
//функция, удаляющая класс со стилями ошибки ввода
const hideFormInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__item-error');
  errorElement.classList.remove('form__error_active');
  errorElement.textContent = '';
};



// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
 //console.log(inputElement);
 showFormInputError(formElement, inputElement, inputElement.validationMessage); //почему не работает с названием места для новой карточки???
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showFormInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideFormInputError(formElement, inputElement);
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

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__save-btn_inactive');
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__save-btn_inactive');
    buttonElement.removeAttribute('disabled', 'disabled');
  }
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.form__item'));
  // console.log(inputList);
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.popup__save-btn');
  console.log(buttonElement);
    // Обойдём все элементы полученной коллекции
    // каждому полю добавим обработчик события input
    //console.log(inputList);
    //console.log(inputElement);
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        toggleButtonState(inputList, buttonElement);
      });
    });
};


const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.form'));
  //console.log(Array.from(document.querySelectorAll('.form')));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();

