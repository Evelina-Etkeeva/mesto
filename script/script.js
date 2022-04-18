
import { FormValidator } from "./components/formValidator.js";
import { Card } from "./components/card.js";
import { initialCards } from "./../initial cards/cards.js";
import { handleCardClick, fillPopupForm, handleEditProfileFormSubmit, handleAddCardSubmit} from "./utils/utils.js";
import {formEditProfile, myName,
aboutMe, validationDict, formAddCard } from "./utils/constant.js";
import Section from "./components/section.js"
import PopupWithForm from './components/popupAndChildren/popupWithForm.js';
import UserInfo from './components/userInfo.js';
import PopupWithUserInfo from './components/popupAndChildren/popupWithUserInfo.js'

//включение валидации на всех формах
const formProfileValidator = new FormValidator(validationDict, formEditProfile);
  formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationDict, formAddCard);
  formCardValidator.enableValidation();


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

// инициализируем класс с информацией о пользователе
export const UserData = new UserInfo({nameSelector: myName, infoSelector: aboutMe})

// инициализируем класс
const popupEditProfileInfo = new PopupWithUserInfo('.popup_content_edit-profile', '.button_type_edit', handleEditProfileFormSubmit, fillPopupForm);
// const popupEditProfileInfo = new PopupWithForm('.popup_content_edit-profile', '.button_type_edit', handleEditProfileFormSubmit);
popupEditProfileInfo.setEventListeners();

// инициализируем класс
export const popupAddCardClass = new PopupWithForm('.popup_content_add-card', '.button_type_add', handleAddCardSubmit);
popupAddCardClass.setEventListeners();