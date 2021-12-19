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

const addBtn = document.querySelector('.button_type_add');
// console.log(addBtn);
const elementTemplate = document.querySelector('.elemet-template');
// console.log(elementTemplate);
const elementsList = document.querySelector('.elements__list');
// console.log(elementsList);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// шесть карточек "из коробки"
  function defaultLayout(list) {

    // console.log(newElement);
    // console.log(initialCards[0].name);
    for(let i=0; i<list.length; i=i+1){
      const newElement = elementTemplate.content.cloneNode(true).querySelector('.element');
      newElement.querySelector('.element__title').textContent = list[i].name;
      newElement.querySelector('.element__image').src = list[i].link;
      elementsList.append(newElement);
    }
  }

defaultLayout(initialCards)
