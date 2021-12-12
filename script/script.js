//console.log("hi"); Проверка подключения
const edit = document.querySelector('.button__edit');
// console.log(edit); Выбор кнопки редактировать профиль
const form = document.querySelector('.popup');
//console.log(form); Выбор секции с попапом
const exit = document.querySelector('.button__close');
//console.log(exit); Выбор кнопки закрыть попап

// форма имя
const nameInput = document.querySelector('.form__item_el_name');
// форма обо мне
const aboutMeInput = document.querySelector('.form__item_el_aboutMe');
//кнопка
const formElementSaveButton = document.querySelector('.button__save');
// имя в профиле
const myName = document.querySelector('.profile__name');
// обо мне в профиле
const aboutMe = document.querySelector('.profile__aboutMe');



//открытие формы с отключением скролла
function open_popup (event) {
  event.preventDefault();
  //плейсхолдер = данным на странице
  nameInput.value = myName.textContent;
  aboutMeInput.value = aboutMe.textContent;
  form.classList.add('popup_active');
}
//закрытие формы без сохранения
function close_popup (event) {
  event.preventDefault();
  form.classList.remove('popup_active');
}
//вызов по клику
edit.addEventListener('click', open_popup);
exit.addEventListener('click', close_popup);



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (event) {
    event.preventDefault();
    //замена данных на новые
    myName.textContent = nameInput.value;
    aboutMe.textContent = aboutMeInput.value;
    //закрыть окнопопап
    form.classList.remove('popup_active');
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка» Почему-то на субмит страница не реагирует, а с кликом все работает
formElementSaveButton.addEventListener('click', formSubmitHandler);
