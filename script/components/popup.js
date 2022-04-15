import { popupImg, popupTitle } from "../utils/utils.js";

export class Popup {
  constructor(popupSelector){
    this._popupSelector = document.querySelector(popupSelector);
  }

  open(){
    document.addEventListener('keydown', this._handleEscClose)
  //как передать функции ивент
    this._popupSelector.classList.add('popup_active');
  }

  close(){
    this._popupSelector.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event){
    if(event.key === 'Escape'){
      this.close();
    }
  }

  setEventListeners(){

    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        this.close();
      }
    });
  }

}

export class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector){
    super(popupSelector);
    this._imageSelector = document.querySelector(imageSelector)
  }
  openImgCard(){
  super.open();
  const altText = 'изображение'; // все картинки - это изображения
  this._popupSelector.src = this._imageSelector.src;
  this._popupSelector.alt = altText;
  this._popupSelector.textContent = this._imageSelector.textContent;
  }
}


export class PopupWithForm extends Popup{
  constructor(popupSelector, handleFormSubmit){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValue(){
   const inputValues = this._popupSelector.querySelectorAll('form__item').reduce((values, item)=>
   values[item]=item.value);
   return inputValues;
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', this._handleFormSubmit);
  }

  close(){
    super.close();
    this._popupSelector.querySelector('.form').recet();
  }
}
