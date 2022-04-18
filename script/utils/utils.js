import { PopupWithImage, UserInfo } from '../components/popup.js';
import { Card } from '../components/card.js';
import Section from "../components/section.js";
import { myName, aboutMe, placeNameInput, placeImgInput, nameInput, aboutMeInput } from './constant.js';

export const imagePopup = document.querySelector('.popup_content_image');
export const popupImg = imagePopup.querySelector('.popup__img'); // картинка на весь экран
export const popupTitle = document.querySelector('.popup__title'); // подпись под картинками на весь экран
export const formAddCard = document.querySelector('.form_content_add-card');// форма с добавлением новой картинки

// export function openPopup(popup){
//   console.log('check');
//   document.addEventListener('keydown', closeOnEscape)
//   //как передать функции ивент
//   popup.classList.add('popup_active');
// }

//  function closeOnEscape(event){
//   if(event.key === 'Escape'){
//     const popup = document.querySelector('.popup_active');
//     closePopup(popup);
//   }
// }

// // закрытие попапа
// export function closePopup(popup){
//   popup.classList.remove('popup_active');
//   document.removeEventListener('keydown', closeOnEscape);
// }

export function handleCardClick(){
  const imgPopup = new PopupWithImage('.popup_content_image');
  imgPopup.openImgCard();
  // imgPopup.setEventListeners();
}

// //добавление новой картинки в галерею
// export function handleAddCardSubmit (event) {
//   event.preventDefault();
//   //мое недорешение: создать новый объект, который будет передаваться в новую копию класса Section
//   const object = [{
//     name: placeNameInput.value,
//     link: placeImgInput.value
//   }];
//   const obj = {
//     items: object,
//     renderer: (object) => {
//       const newCard = new Card(object.name, object.link, '.element-template', handleCardClick);
//       const cardElement = newCard.generateCard();
//       return cardElement;
//     }
//   }
//     const OneNewCard = new Section(obj, '.elements__list');
//     OneNewCard.renderItems();

//   //закрыть окнопопап
//   closePopupAddCard();
//   //очистить поля ввода
//   formAddCard.reset();
// }