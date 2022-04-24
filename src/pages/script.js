import './index.css'; // добавьте импорт главного файла стилей
import { FormValidator } from "../components/formValidator.js";
import { Card } from "../components/card.js";
import { initialCards } from "../initial cards/cards.js";
import {formEditProfile, validationDict, formAddCard } from "../components/constant.js";
import Section from "../components/section.js"
import PopupWithForm from '../components/popupWithForm.js';
import UserInfo from '../components/userInfo.js';
import PopupWithImage from '../components/popupWithImage.js'


//включение валидации на всех формах
const formProfileValidator = new FormValidator(validationDict, formEditProfile);
  formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationDict, formAddCard);
  formCardValidator.enableValidation();


//создаем объект с карточками по-умолчанию и функцией, которая рисует одну карточку
const objDefault = {
  items: initialCards.reverse(),
  renderer: (initialCards) => {
    const newCardElement = createCardElement(initialCards, '.element-template', handleCardClick);
    return newCardElement;
  }
}

// нарисуем карточки по-умолчанию
const cardsList = new Section(objDefault, '.elements__list');
cardsList.renderItems();

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

// функция создающая экземпляр класса попап с картинкой - колбек слушателя в классе card
function handleCardClick(title, src){
  imgPopup.openImgCard(title, src);
  imgPopup.setEventListeners();
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
  const inputValues = getData();
  userData.setUserInfo(inputValues);
  //закрыть окнопопап
  popupEditProfileInfo.close();
}

//добавление новой картинки в галерею
function handleAddCardSubmit (getData) {
  const inputValues = getData();
  const newCardElement = createCardElement(inputValues, '.element-template', handleCardClick);
  cardsList.addItem(newCardElement);
  popupAddCardClass.close();

}

function createCardElement(obj, selector, callback){
  const newCard = new Card(obj.name, obj.info, selector, callback);
  const newCardElement = newCard.generateCard();
  return newCardElement;
}