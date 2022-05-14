import './index.css'; // добавьте импорт главного файла стилей
import { FormValidator } from "../components/formValidator.js";
import { Card } from "../components/card.js";
import {formEditProfile, validationDict, formAddCard, formEditAvatar } from "../components/constant.js";
import Section from "../components/section.js"
import PopupWithForm from '../components/popupWithForm.js';
import UserInfo from '../components/userInfo.js';
import PopupWithImage from '../components/popupWithImage.js'
import PopupDeleteCard from '../components/popupWithConfirmation.js';
import Api from '../components/api.js';

// функция создающая экземпляр класса попап с картинкой - колбек слушателя в классе card
export function handleCardClick(title, src){
  imgPopup.openImgCard(title, src);
  imgPopup.setEventListeners();
}
// колбэк-функция, открывающая экземпляр класса попап с формой удаления картинки 
export function handleDeleteClick(cardId){
  const parentElement = event.target.closest('.element');
  popupDeleteCard.open(parentElement, cardId);
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
  api.updateUserData(popupEditProfileInfo, inputValues);
}

//добавление новой картинки в галерею
function handleAddCardSubmit (getData) {
  popupAddCardClass.loading(true);
  const inputValues = getData();
  api.addNewCard(popupAddCardClass, inputValues);
}

// функция, удаляющая картинку
function handleDeleteCardSubmit(element, cardId) {
  event.preventDefault();
  api.deleteCard(popupDeleteCard, element, cardId);
}

export function handleLikeClick(cardObj, showLike){

  if (cardObj.likes.some(e => e._id === userData._authorId)) {
    api.deleteLike(cardObj, showLike);
  }
  else {
    api.addLike(cardObj, showLike);
  }
}

export function createCardElement(cardObj, authorId, selector, callbackCardClick, callbackDelete, handleLikeClick){
  const newCard = new Card(cardObj, selector, callbackCardClick, callbackDelete, handleLikeClick);
  const newCardElement = newCard.generateCard(authorId);
  return newCardElement;
}

function handleEditAvatarSubmit(getData){
  event.preventDefault();
  popupEditAvatar.loading(true); 
  const inputAvatarUrl = getData();
  api.updateAvatar(popupEditAvatar, inputAvatarUrl);
}

//включение валидации на всех формах
const formProfileValidator = new FormValidator(validationDict, formEditProfile);
  formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationDict, formAddCard);
  formCardValidator.enableValidation();

const formAvatarValidator = new FormValidator(validationDict, formEditAvatar);
  formAvatarValidator.enableValidation();

// Нарисуем карточки по-умолчанию; их нет. Получим их с сервера попозже
const cardsList = new Section({}, '.elements__list');

// инициализируем класс для попапа с картинкой
const imgPopup = new PopupWithImage('.popup_content_image');

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
// popupDeleteCard.buttonSelector.addEventListener('click', ()=>popupDeleteCard.open());
popupDeleteCard.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup_content_edit-avatar', '.profile__img', handleEditAvatarSubmit);
popupEditAvatar.buttonSelector.addEventListener('click', () => {
  popupEditAvatar.open();
});
popupEditAvatar.setEventListeners();

const api = new Api(userData, cardsList);
api.getInitialCards();
api.getUserData();
