//console.log("hi"); Проверка подключения
const edit = document.querySelector('.button_type_edit');
// console.log(edit); Выбор кнопки редактировать профиль
const popupEditProfile = document.querySelector('.popup_content_edit-profile');
//кнопка закрыть окно редактирования профиля
const closeEditProfile = popupEditProfile.querySelector('.button_type_close');





//формы в окне изменения информации профиля
const formEditProfile = document.querySelector('.form_content_edit-profile');
// форма имя
const nameInput = document.querySelector('.form__item_el_name');
// форма обо мне
const aboutMeInput = document.querySelector('.form__item_el_about-me');
// имя в профиле
const myName = document.querySelector('.profile__name');
// обо мне в профиле
const aboutMe = document.querySelector('.profile__about-me');
//кнопка добавить карточки
const addBtn = document.querySelector('.button_type_add');
// console.log(addBtn);
//балванка для карточки
const elementTemplate = document.querySelector('.elemet-template');
// console.log(elementTemplate);
//список для карточек
const elementsList = document.querySelector('.elements__list');
// console.log(elementsList);
//окно для добавления новых картинок
const popupAddCard = document.querySelector('.popup_content_add-card');
//кнопка закрыть окно добавления новых картинок
const closeAddCard = popupAddCard.querySelector('.button_type_close');
// форма с добавлением новой картинки
const formAddCard = document.querySelector('.form_content_add-card');
console.log(formAddCard);
console.log(formEditProfile);
//форма с названием карточки
const placeNameInput = document.querySelector('.form__item_el_place-name');
//форма с ссылкой на картинку
const placeImgInput = document.querySelector('.form__item_el_place-img');
//шесть карточек"из коробки"
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



//открытие формы редактирования профиля
function openPopupEditProfile () {
  nameInput.value = myName.textContent;
  aboutMeInput.value = aboutMe.textContent;
  popupEditProfile.classList.add('popup_active');
}
//закрытие формы без сохранения
function closePopupEditProfile () {
  popupEditProfile.classList.remove('popup_active');
}

//вызов по клику
edit.addEventListener('click', openPopupEditProfile);
closeEditProfile.addEventListener('click', closePopupEditProfile);


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (event) {
    event.preventDefault();
    //замена данных на новые
    myName.textContent = nameInput.value;
    aboutMe.textContent = aboutMeInput.value;
    //закрыть окнопопап
    closePopupEditProfile();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка» Почему-то на субмит страница не реагирует, а с кликом все работает
formEditProfile.addEventListener('submit', formSubmitHandler);




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

defaultLayout(initialCards);

//открытие формы добавления картинки
function openPopupAddCard () {
  popupAddCard.classList.add('popup_active');
}
//закрытие формы без сохранения
function closePopupAddCard () {
  popupAddCard.classList.remove('popup_active');
}
//вызов по клику
addBtn.addEventListener('click', openPopupAddCard);
closeAddCard.addEventListener('click', closePopupAddCard);

//добавление новой картинки
function addPlaceSubmitHandler (event) {
  event.preventDefault();
  //замена данных на новые
  console.log('test');
  const newElement = elementTemplate.content.cloneNode(true).querySelector('.element');
  newElement.querySelector('.element__title').textContent  = placeNameInput.value;
  newElement.querySelector('.element__image').src = placeImgInput.value;
  elementsList.prepend(newElement);
  //закрыть окнопопап
  closePopupAddCard();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка» Почему-то на субмит страница не реагирует, а с кликом все работает
formAddCard.addEventListener('submit', addPlaceSubmitHandler);



