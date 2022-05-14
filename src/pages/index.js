import './index.css'; // добавьте импорт главного файла стилей
import { FormValidator } from "../components/formValidator.js";
import { Card } from "../components/card.js";
import {formEditProfile, validationDict, formAddCard, formEditAvatar, baseUrl, headers } from "../components/constant.js";
import Section from "../components/section.js"
import PopupWithForm from '../components/popupWithForm.js';
import UserInfo from '../components/userInfo.js';
import PopupWithImage from '../components/popupWithImage.js'
import PopupDeleteCard from '../components/popupWithConfirmation.js';
import Api from '../components/api.js';

// функция создающая экземпляр класса попап с картинкой - колбек слушателя в классе card
function handleCardClick(title, src){
  imgPopup.openImgCard(title, src);
}
// колбэк-функция, открывающая экземпляр класса попап с формой удаления картинки 
function handleDeleteClick(cardId, deleteElement){
  popupDeleteCard.open(cardId, deleteElement);
}

// функция заполнение форм ввода данных пользователя
function fillPopupForm () {
  const pageInfo = userData.getUserInfo();
  const [nameInput, aboutMeInput] = popupEditProfileInfo._inputValues;
  nameInput.value = pageInfo.name;
  aboutMeInput.value = pageInfo.info;
}

// функция, сохраняющая новую информацию в профиль
function handleEditProfileFormSubmit (getData) {
  //замена данных на новые
  popupEditProfileInfo.loading(true);
  const inputValues = getData();
  api.updateUserData(inputValues)
  .then(result =>{
    userData.setUserInfo(result);
  })
  .catch(err => console.log(`Ошибка.....: ${err}`))
  .finally(()=>  {
    popupEditProfileInfo.loading(false)
    popupEditProfileInfo.close();
  });
}

//добавление новой картинки в галерею
function handleAddCardSubmit (getData) {
  popupAddCardClass.loading(true);
  const inputValues = getData();
  api.addNewCard(inputValues)
  .then((result) => {
    //создаем объект с карточками по-умолчанию и функцией, которая рисует одну карточку
    const newCardElement = createCardElement(result);
    cardsList.addItem(newCardElement);
  })
  .catch(err => console.log(`Ошибка.....: ${err}`))
  .finally(()=>  {
    popupAddCardClass.loading(false);
    popupAddCardClass.close();
  });  

}

// функция, удаляющая картинку
function handleDeleteCardSubmit(cardId, deleteElement) {
  event.preventDefault();
  api.deleteCard(cardId)
  .then(()=>{
    deleteElement();
    popupDeleteCard.close();
  })
  .catch(err => console.log(`Ошибка.....: ${err}`));
}

function handleLikeClick(cardObj, showLike){

  if (cardObj.likes.some(e => e._id === userData.authorId)) {
    api.deleteLike(cardObj._id)
    .then(res => {
      cardObj.likes = res.likes;
      showLike(false);
    })
    .catch(err => console.log(`Ошибка.....: ${err}`));     
  }
  else {
    api.addLike(cardObj._id)
    .then(res => {
      cardObj.likes = res.likes;
      showLike(true);
    })
    .catch(err => console.log(`Ошибка.....: ${err}`)); 
  }
}

function createCardElement(cardObj){
  const newCard = new Card(cardObj, '.element-template', handleCardClick, handleDeleteClick, handleLikeClick);
  const newCardElement = newCard.generateCard(userData.authorId);
  return newCardElement;
}

function handleEditAvatarSubmit(getData){
  event.preventDefault();
  popupEditAvatar.loading(true); 
  const inputAvatarUrl = getData();
  api.updateAvatar(inputAvatarUrl[0])    
  .then(res => {
    if (res.ok) {
      return res.json();
    } else{
      return Promise.reject(`Ошибка: ${res.status}`);
    }    
  })
  .then(res => {
    userData.setUserInfo(res);
  })
  .catch(err => console.log(`Ошибка.....: ${err}`)) 
  .finally(()=>  {
    popupEditAvatar.close();
    popupEditAvatar.loading(false); 
  });
}

//включение валидации на всех формах
const formProfileValidator = new FormValidator(validationDict, formEditProfile);
  formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationDict, formAddCard);
  formCardValidator.enableValidation();

const formAvatarValidator = new FormValidator(validationDict, formEditAvatar);
  formAvatarValidator.enableValidation();

const renderer = (cardObj) => {
  const newCardElement = createCardElement(cardObj);
  return newCardElement;
}

// Нарисуем карточки по-умолчанию; их нет. Получим их с сервера попозже
const cardsList = new Section(renderer, '.elements__list');

// инициализируем класс для попапа с картинкой
const imgPopup = new PopupWithImage('.popup_content_image');
imgPopup.setEventListeners();

// инициализируем класс с информацией о пользователе
const userData = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__about-me', avatarSelector: '.profile__img'})

// инициализируем класс
const popupEditProfileInfo = new PopupWithForm('.popup_content_edit-profile', '.button_type_edit', handleEditProfileFormSubmit);
popupEditProfileInfo.buttonSelector.addEventListener('click', () => {
  popupEditProfileInfo.open();
  fillPopupForm();
});
popupEditProfileInfo.setEventListeners();

// инициализируем класс
const popupAddCardClass = new PopupWithForm('.popup_content_add-card', '.button_type_add', handleAddCardSubmit);
popupAddCardClass.buttonSelector.addEventListener('click', () => popupAddCardClass.open());
popupAddCardClass.setEventListeners();

// инициализируем класс
const popupDeleteCard = new PopupDeleteCard('.popup_content_delete-card', handleDeleteCardSubmit);
popupDeleteCard.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup_content_edit-avatar', '.profile__img', handleEditAvatarSubmit);
popupEditAvatar.buttonSelector.addEventListener('click', () => {
  popupEditAvatar.open();
});
popupEditAvatar.setEventListeners();

const api = new Api(baseUrl, headers);

Promise.all([
  api.getUserData(),
  api.getInitialCards()
])
.then((results) => {
  //создаем объект с карточками по-умолчанию и функцией, которая рисует одну карточку
  userData.setUserInfo(results[0]);
  cardsList.renderItems(results[1].reverse());
})
.catch(err => console.log(`Ошибка.....: ${err}`)); 