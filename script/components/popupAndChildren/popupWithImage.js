
import  Popup  from './popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
      super(popupSelector);
    }
    openImgCard(){
      const cardSelector = event.target;
      const altText = 'изображение'; // все картинки - это изображения
      this._popupSelector.querySelector('.popup__img').src = cardSelector.src;
      this._popupSelector.alt = altText;
      this._popupSelector.querySelector('.popup__title').textContent = cardSelector.closest('.element').querySelector('.element__title').textContent;
      super.open();
    }
  }