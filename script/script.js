
import { FormValidator } from "./components/formValidator.js";
import { Card } from "./components/card.js";
import { initialCards } from "./../initial cards/cards.js";
import { formAddCard, handleCardClick} from "./utils/utils.js";
import {elementsList, openEditProfile, popupEditProfile,
formEditProfile, aboutMeInput, myName, nameInput,
aboutMe, popupAddCard, placeNameInput, placeImgInput, openAddCard} from "./utils/constant.js";
import Section from "./components/section.js"
import { Popup, PopupWithForm, PopupWithImage, PopupWithUserInfo, UserInfo } from './components/popup.js';

const validationDict = {
  formSelector: '.form',
  inputSelector:  '.form__item',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'form__item-error',
  errorClass: 'form__error_active'
}; //словарь для валидации форм

//закрытие по кнопке esc



// //открытие формы редактирования профиля
// function openPopupEditProfile () {
//   nameInput.value = myName.textContent;
//   aboutMeInput.value = aboutMe.textContent;
//   openPopup(popupEditProfile);
// }

// //закрытие формы редактирования профиля без сохранения
// function closePopupEditProfile () {
//   closePopup(popupEditProfile);
//   nameInput.value = myName.textContent;
//   aboutMeInput.value = aboutMe.textContent;
// }

// //открытие формы добавления картинки
// function openPopupAddCard () {
//   openPopup(popupAddCard);
//   formAddCard.reset();
// }

// //закрытие формы добавления картинки без сохранения
// function closePopupAddCard () {
//   closePopup(popupAddCard);
//   formAddCard.reset();
// }

//включение валидации на всех формах
const formProfileValidator = new FormValidator(validationDict, formEditProfile);
  formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationDict, formAddCard);
  formCardValidator.enableValidation();

// //закрытие кликом на оверлей или кнопку
// //для окна редактирования профиля
// popupEditProfile.addEventListener('click', (evt) => {
//   if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
//     closePopupEditProfile();
//   }
// });
// //для окна добавления новой картинки
// popupAddCard.addEventListener('click', (evt) => {
//   if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
//     closePopupAddCard(popupAddCard);
//   }
// });
//закрыть картину на весь экран
// imagePopup.addEventListener('click', (evt) => {
//   if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
//     closePopup(imagePopup);
//   }
// });

// сохранение новой карточки
// formAddCard.addEventListener('submit', handleAddCardSubmit);
//открыть попап добавление новых картинок
// openAddCard.addEventListener('click', openPopupAddCard);

// Обновление информации профиля
// formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
// открыть попап редактирования профиля
// openEditProfile.addEventListener('click', openPopupEditProfile);

//добавление новой картинки в галерею
function handleAddCardSubmit (event) {
  event.preventDefault();
  //мое недорешение: создать новый объект, который будет передаваться в новую копию класса Section
  const object = [{
    name: placeNameInput.value,
    link: placeImgInput.value
  }];
  const obj = {
    items: object,
    renderer: (object) => {
      const newCard = new Card(object.name, object.link, '.element-template', handleCardClick);
      const cardElement = newCard.generateCard();
      return cardElement;
    }
  }
    const OneNewCard = new Section(obj, '.elements__list');
    OneNewCard.renderItems();
    popupAddCardClass.close();

}

function fillPopupForm (event) {
  const pageInfo = UserData.getUserInfo();
  nameInput.value = pageInfo.name;
  aboutMeInput.value = pageInfo.info;
}

// функция, сохраняющая новую информацию в профиль
function handleEditProfileFormSubmit (event) {
  event.preventDefault();
  //замена данных на новые
  UserData.setUserInfo({name: nameInput.value, info: aboutMeInput.value});
  //закрыть окнопопап
  document.querySelector('.popup_content_edit-profile').classList.remove('popup_active');
}

//создаем объект с карточками по-умолчанию и функцией, которая рисует одну карточку
const objDefault = {
  items: initialCards.reverse(),
  renderer: (initialCards) => {
    const newCard = new Card(initialCards.name, initialCards.link, '.element-template', handleCardClick);
    const cardElement = newCard.generateCard();
    return cardElement;
  }
}

// нарисуем карточки по-умолчанию
const InitialCardsList = new Section(objDefault, '.elements__list');
InitialCardsList.renderItems();

const UserData = new UserInfo({nameSelector: myName, infoSelector: aboutMe})

const popupEditProfileInfo = new PopupWithUserInfo('.popup_content_edit-profile', '.button_type_edit', handleEditProfileFormSubmit, fillPopupForm);
// const popupEditProfileInfo = new PopupWithForm('.popup_content_edit-profile', '.button_type_edit', handleEditProfileFormSubmit);
popupEditProfileInfo.setEventListeners();

const popupAddCardClass = new PopupWithForm('.popup_content_add-card', '.button_type_add', handleAddCardSubmit);
popupAddCardClass.setEventListeners();