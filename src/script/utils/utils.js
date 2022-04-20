import PopupWithImage from '../components/popupAndChildren/popupWithImage.js'
import {UserData, popupAddCardClass} from '../script.js';
import { nameInput, aboutMeInput } from './constant.js';
import { placeImgInput, placeNameInput } from './constant.js';
import { Card } from '../components/card.js';
import Section from '../components/section.js';

// функция создающая экземпляр класса попап с картинкой - колбек слушателя в классе card
export function handleCardClick(){
  const imgPopup = new PopupWithImage('.popup_content_image');
  imgPopup.openImgCard();
}

// функция заполнение форм ввода данных пользователя
export function fillPopupForm (event) {
  const pageInfo = UserData.getUserInfo();
  nameInput.value = pageInfo.name;
  aboutMeInput.value = pageInfo.info;
}

// функция, сохраняющая новую информацию в профиль
export function handleEditProfileFormSubmit (event) {
  event.preventDefault();
  //замена данных на новые
  UserData.setUserInfo({name: nameInput.value, info: aboutMeInput.value});
  //закрыть окнопопап
  document.querySelector('.popup_content_edit-profile').classList.remove('popup_active');
}

//добавление новой картинки в галерею
export function handleAddCardSubmit (event) {
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