//console.log("hi"); Проверка подключения
let edit = document.querySelector('.profile__editBtn');
// console.log(edit); Выбор кнопки редактировать профиль
let form = document.querySelector('.form');
//console.log(form); Выбор секции с попапом
let exit = document.querySelector('.close_button');
//console.log(exit); Выбор кнопки закрыть попап
let page = document.querySelector('.page');
//console.log(page); Выбор всей страницы для отклюения скролла



//открытие формы с отключением скролла
function open_form (event) {
  event.preventDefault();
  //плейсхолдер = данным на странице
  document.querySelector('.form__item_el_name').placeholder = document.querySelector('.profile__name').textContent;
  document.querySelector('.form__item_el_about_me').placeholder = document.querySelector('.profile__aboutMe').textContent;
  form.classList.add('js_form_active');
  page.classList.add('page_no_scroll');
}
//закрытие формы без сохранения
function close_form (event) {
  event.preventDefault();
  form.classList.remove('js_form_active');
  page.classList.remove('page_no_scroll');
}
//вызов по клику
edit.addEventListener('click', open_form);
exit.addEventListener('click', close_form);


// форма имя
let nameInput = document.querySelector('.form__item_el_name');
// форма обо мне
let aboutMeInput = document.querySelector('.form__item_el_about_me');
//кнопка
let formElementSaveButton = document.querySelector('.save_button');
// имя в профиле
let myName = document.querySelector('.profile__name');
// обо мне в профиле
let aboutMe = document.querySelector('.profile__aboutMe');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (event) {
    event.preventDefault();
    //замена данных нановые
    myName.textContent = nameInput.value;
    aboutMe.textContent = aboutMeInput.value;
    //закрыть окнопопап
    form.classList.remove('js_form_active');
    page.classList.remove('page_no_scroll');
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка» Почему-то на субмит страница не реагирует, а с кликом все работает
formElementSaveButton.addEventListener('click', formSubmitHandler);
