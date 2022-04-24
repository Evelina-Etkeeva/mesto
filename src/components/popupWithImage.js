
import  Popup  from './popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
      super(popupSelector);
      this._srcSelector = this._popupSelector.querySelector('.popup__img');
      this._titleSelector = this._popupSelector.querySelector('.popup__title');
    }
    openImgCard(title, src){
      this._srcSelector.src = src;
      this._srcSelector.alt = title;
      this._titleSelector.textContent = title;
      super.open();
    }
  }