
import { FormValidator } from "./formValidator.js";
import { Card } from "./card.js";
import { initialCards } from "../initial cards/cards.js";
import { openPopup, imagePopup, closePopup, formAddCard } from "./utils.js";

const elementsList = document.querySelector('.elements__list');//список карточек
const openEditProfile = document.querySelector('.button_type_edit');//кнопка открыть окно редактирования профиля
const popupEditProfile = document.querySelector('.popup_content_edit-profile');// попап редактирования профиля
const formEditProfile = document.querySelector('.form_content_edit-profile');//формы в окне изменения информации профиля
const nameInput = document.querySelector('.form__item_el_name');// форма имя
const aboutMeInput = document.querySelector('.form__item_el_about-me');// форма обо мне
const myName = document.querySelector('.profile__name');// имя в профиле
const aboutMe = document.querySelector('.profile__about-me'); // обо мне в профиле
const popupAddCard = document.querySelector('.popup_content_add-card');//попап для добавления новой карточки

const placeNameInput = document.querySelector('.form__item_el_place-name');//форма с названием карточки
const placeImgInput = document.querySelector('.form__item_el_place-img');//форма с ссылкой на картинку
const openAddCard = document.querySelector('.button_type_add'); //кнопка добавить карточки
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
  formAddCard.reset();

  //закрыть окнопопап
  closePopupAddCard();
  elementsList.prepend(cardElement);
}

//включение валидации на всех формах
 const formList = Array.from(document.querySelectorAll(validationDict.formSelector));

 const formArray = [];

 formList.forEach((formElement) => {
  const form = new FormValidator(validationDict, formElement);
  form.enableValidation();
  formArray.push(form); //это имелось в виду?
});

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
initialCards.forEach(data => {
  const initCardElement = makeNewCard(data.name, data.link, '.element-template');
  elementsList.prepend(initCardElement);
});
// Обновление информации профиля
formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
// открыть попап редактирования профиля
openEditProfile.addEventListener('click', openPopupEditProfile);


