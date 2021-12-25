
//балванка для карточки
const elementTemplate = document.querySelector('.elemet-template');
// console.log(elementTemplate);
//список для карточек
const elementsList = document.querySelector('.elements__list');
// console.log(elementsList);
//окно для добавления новых картинок

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


function addLike(event){
  event.target.classList.toggle('active');
}

function deleteElement(event){
  event.target.closest('.element').remove();
}

function openImagePopup(event){
  parentElement = event.target.closest('.element');
  const imagePopupImg = document.querySelector('.image-popup__img');
  imagePopupImg.src = parentElement.querySelector('.element__image').src;
  const imagePopupTitle = document.querySelector('.image-popup__title');
  imagePopupTitle.textContent = parentElement.querySelector('.element__title').textContent;
  document.querySelector('.image-popup').classList.add('image-popup_active');
}

function closeImagePopup(){
  document.querySelector('.image-popup').classList.remove('image-popup_active');
}
// шесть карточек "из коробки"
function defaultLayout(list) {
  for(let i=0; i<list.length; i=i+1){
    const defaultElement = elementTemplate.content.cloneNode(true).querySelector('.element');
    defaultElement.querySelector('.element__title').textContent = list[i].name;
    defaultElement.querySelector('.element__image').src = list[i].link;
    elementsList.prepend(defaultElement);
    const defaultLikeButton = defaultElement.querySelector('.button_type_like');// лайки для элементов по умолчанию
    defaultLikeButton.addEventListener('click', addLike);
    const defaultDeleteButton = defaultElement.querySelector('.button_type_delete');
    defaultDeleteButton.addEventListener('click', deleteElement);
    const defaultImageButton = defaultElement.querySelector('.element__image');
    defaultImageButton.addEventListener('click', openImagePopup);
  }
}

defaultLayout(initialCards);
//открытие формы добавления картинки
const popupAddCard = document.querySelector('.popup_content_add-card');//попап для добавления новой карточки
const closeAddCard = popupAddCard.querySelector('.button_type_close');//кнопка закрыть окно добавления новых картинок
const formAddCard = document.querySelector('.form_content_add-card');// форма с добавлением новой картинки
const placeNameInput = document.querySelector('.form__item_el_place-name');//форма с названием карточки
const placeImgInput = document.querySelector('.form__item_el_place-img');//форма с ссылкой на картинку
const addButton = document.querySelector('.button_type_add'); //кнопка добавить карточки

function openPopupAddCard () {
  popupAddCard.classList.add('popup_active');
}

//закрытие формы без сохранения

function closePopupAddCard () {
  popupAddCard.classList.remove('popup_active');
}
//вызов по клику
addButton.addEventListener('click', openPopupAddCard);
closeAddCard.addEventListener('click', closePopupAddCard);


function addPlaceSubmitHandler (event) {
  event.preventDefault();
  //замена данных на новые
  const newElement = elementTemplate.content.cloneNode(true).querySelector('.element');
  newElement.querySelector('.element__title').textContent  = placeNameInput.value;
  const elementImg = newElement.querySelector('.element__image');
  elementImg.src = placeImgInput.value;
  placeNameInput.value ='';
  placeImgInput.value = '';
  const likeButton = newElement.querySelector('.button_type_like');
  likeButton.addEventListener('click', addLike);
  const deleteButton = newElement.querySelector('.button_type_delete');
  deleteButton.addEventListener('click', deleteElement);
  const imageButton = newElement.querySelector('.element__image');
  imageButton.addEventListener('click', openImagePopup);
  //закрыть окнопопап
  closePopupAddCard();
  elementsList.prepend(newElement);
}

formAddCard.addEventListener('submit', addPlaceSubmitHandler);

const imagePopupCloseBtn = document.querySelector('.image-popup__close-btn');
imagePopupCloseBtn.addEventListener('click', closeImagePopup);




