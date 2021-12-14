//console.log("hi"); Проверка подключения
const edit = document.querySelector('.button_type_edit');
// console.log(edit); Выбор кнопки редактировать профиль
const popup = document.querySelector('.popup');

const exit = document.querySelector('.button_type_close');
//console.log(exit); Выбор кнопки закрыть попап

const form = document.querySelector('.form');

// форма имя
const nameInput = document.querySelector('.form__item_el_name');
// форма обо мне
const aboutMeInput = document.querySelector('.form__item_el_about-me');
// имя в профиле
const myName = document.querySelector('.profile__name');
// обо мне в профиле
const aboutMe = document.querySelector('.profile__about-me');



//открытие формы с отключением скролла
function openPopup () {
  nameInput.value = myName.textContent;
  aboutMeInput.value = aboutMe.textContent;
  popup.classList.add('popup_active');
}
//закрытие формы без сохранения
function closePopup () {
  popup.classList.remove('popup_active');
}
//вызов по клику
edit.addEventListener('click', openPopup);
exit.addEventListener('click', closePopup);



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (event) {
    event.preventDefault();
    //замена данных на новые
    myName.textContent = nameInput.value;
    aboutMe.textContent = aboutMeInput.value;
    //закрыть окнопопап
    closePopup();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка» Почему-то на субмит страница не реагирует, а с кликом все работает
form.addEventListener('submit', formSubmitHandler);
