
import { FormValidator } from "./components/formValidator.js";
import { Card } from "./components/card.js";
import { initialCards } from "./../initial cards/cards.js";
import { openPopup, imagePopup, closePopup, formAddCard } from "./utils/utils.js";
import {elementsList, openEditProfile, popupEditProfile,
formEditProfile, aboutMeInput, myName,
aboutMe, popupAddCard, placeNameInput, placeImgInput, openAddCard} from "./utils/constant.js";
import Section from "./components/section.js"

const validationDict = {
  formSelector: '.form',
  inputSelector:  '.form__item',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'form__item-error',
  errorClass: 'form__error_active'
}; //словарь для валидации форм

//закрытие по кнопке esc



//открытие формы редактирования профиля
function openPopupEditProfile () {
  nameInput.value = myName.textContent;
  aboutMeInput.value = aboutMe.textContent;
  openPopup(popupEditProfile);
}

//закрытие формы редактирования профиля без сохранения
function closePopupEditProfile () {
  closePopup(popupEditProfile);
  nameInput.value = myName.textContent;
  aboutMeInput.value = aboutMe.textContent;
}

//открытие формы добавления картинки
function openPopupAddCard () {
  openPopup(popupAddCard);
  formAddCard.reset();
}

//закрытие формы добавления картинки без сохранения
function closePopupAddCard () {
  closePopup(popupAddCard);
  formAddCard.reset();
}

// функция, сохраняющая новую информацию в профиль
function handleEditProfileFormSubmit (event) {
    event.preventDefault();
    //замена данных на новые
    myName.textContent = nameInput.value;
    aboutMe.textContent = aboutMeInput.value;
    //закрыть окнопопап
    closePopup(popupEditProfile);
}
function makeNewCard(name, link, template){
  const newCard = new Card(name, link, template)
  const cardElement = newCard.generateCard();
  return cardElement;
}
//добавление новой картинки в галерею
function handleAddCardSubmit (event) {
  event.preventDefault();
  //замена данных на новые
  const cardElement = makeNewCard(placeNameInput.value, placeImgInput.value, '.element-template');


  //закрыть окнопопап
  closePopupAddCard();

  formAddCard.reset();
  elementsList.prepend(cardElement);
}

//включение валидации на всех формах
const formProfileValidator = new FormValidator(validationDict, formEditProfile);
  formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationDict, formAddCard);
  formCardValidator.enableValidation();

//закрытие кликом на оверлей или кнопку
//для окна редактирования профиля
popupEditProfile.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
    closePopupEditProfile();
  }
});
//для окна добавления новой картинки
popupAddCard.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
    closePopupAddCard(popupAddCard);
  }
});
//закрыть картину на весь экран
imagePopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
    closePopup(imagePopup);
  }
});


// сохранение новой карточки
formAddCard.addEventListener('submit', handleAddCardSubmit);
//открыть попап добавление новых картинок
openAddCard.addEventListener('click', openPopupAddCard);
// карточки по умолчанию
// initialCards.forEach(data => {
//   const initCardElement = makeNewCard(data.name, data.link, '.element-template');
//   elementsList.prepend(initCardElement);
// });
// Обновление информации профиля
formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
// открыть попап редактирования профиля
openEditProfile.addEventListener('click', openPopupEditProfile);

//создаем объект с карточками и функцией, которая рисует одну карточку
const obj = {
  items: initialCards,
  renderer: (initialCards) => {
    const newCard = new Card(initialCards.name, initialCards.link, '.element-template')
    const cardElement = newCard.generateCard();
    return cardElement;
  }
}

// const InitialCardsList = new Section({items: initialCards, renderer: makeNewCard}, '.elements__list');
const InitialCardsList = new Section(obj, '.elements__list');
InitialCardsList.renderItems();
