import './index.css'; // добавьте импорт главного файла стилей
import { FormValidator } from "../components/formValidator.js";
import { Card } from "../components/card.js";
import { initialCards } from "../initial cards/cards.js";
import {formEditProfile, validationDict, formAddCard } from "../components/constant.js";
import Section from "../components/section.js"
import PopupWithForm from '../components/popupWithForm.js';
import UserInfo from '../components/userInfo.js';
import PopupWithImage from '../components/popupWithImage.js'
import PopupDeleteCard from '../components/popupDeleteCard.js';


//включение валидации на всех формах
const formProfileValidator = new FormValidator(validationDict, formEditProfile);
  formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationDict, formAddCard);
  formCardValidator.enableValidation();

// Нарисуем карточки по-умолчанию; их нет. Получим их с сервера попозже
const cardsList = new Section({}, '.elements__list');

// инициализируем класс для попапа с картинкой
const imgPopup = new PopupWithImage('.popup_content_image');

// инициализируем класс с информацией о пользователе
const userData = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__about-me'})

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

// функция создающая экземпляр класса попап с картинкой - колбек слушателя в классе card
function handleCardClick(title, src){
  imgPopup.openImgCard(title, src);
  imgPopup.setEventListeners();
}
// колбэк-функция, открывающая экземпляр класса попап с формой удаления картинки 
function handleDeleteClick(){
  const parentElement = event.target.closest('.element');
  popupDeleteCard.open(parentElement);
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
  userData.setUserInfo(inputValues);
  //закрыть окнопопап
  popupEditProfileInfo.close();
}

//добавление новой картинки в галерею
function handleAddCardSubmit (getData) {
  popupAddCardClass.loading(true);
  const inputValues = getData();
  const newCardElement = createCardElement(inputValues, '.element-template', handleCardClick, handleDeleteClick);
  cardsList.addItem(newCardElement);
  popupAddCardClass.close();

}

// функция, удаляющая картинку
function handleDeleteCardSubmit(element) {
  event.preventDefault();
  element.remove(); //что значит занулить?
  popupDeleteCard.close();
}

function createCardElement(cardArr, selector, callbackCardClick, callbackDelete){
  const newCard = new Card(cardArr[0], cardArr[1], selector, callbackCardClick, callbackDelete);
  const newCardElement = newCard.generateCard();
  return newCardElement;
}


const popupEditAvatar = new PopupWithForm('.popup_content_edit-avatar', '.profile__img', handleEditAvatarSubmit);
popupEditAvatar.buttonSelector.addEventListener('click', () => {
  popupEditAvatar.open();
});
popupEditAvatar.setEventListeners();

function handleEditAvatarSubmit(getData){
  event.preventDefault();
  popupEditAvatar.loading(true); 
  const inputAvatarUrl = getData();
  const avatarSelector = document.querySelector('.profile__img');
  avatarSelector.src = inputAvatarUrl[0];
  popupEditAvatar.close();

}

fetch('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
  headers: {
    authorization: 'a81905a8-70e9-49b5-82c2-f5f8e94b1f23'
  }
})
  .then(res => res.json())
  .then((result) => {
    //создаем объект с карточками по-умолчанию и функцией, которая рисует одну карточку
    result.forEach(item => {
      const oneCardArr = [item.name, item.link];
      const newCardElement = createCardElement(oneCardArr, '.element-template', handleCardClick, handleDeleteClick);
      cardsList.addItem(newCardElement);
    });
  });   

fetch('https://mesto.nomoreparties.co/v1/cohort-40/users/me', {
  method: 'GET',
  headers: {
    authorization: 'a81905a8-70e9-49b5-82c2-f5f8e94b1f23'
  }
})
  .then(res => res.json())
  .then((result) => {
    const infoArr = [result.name, result.about];
    userData.setUserInfo(infoArr);
  }); 