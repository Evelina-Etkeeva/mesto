import Popup from './popup.js';

export default class PopupWithForm extends Popup{
    constructor(popupSelector, buttonSelector, handleFormSubmit){
      super(popupSelector);
      this._buttonSelector = document.querySelector(buttonSelector);
      this._handleFormSubmit = handleFormSubmit;
    }
    _getInputValues(){
     const inputValues = this._popupSelector.querySelectorAll('form__item').reduce((values, item)=>
     values[item]=item.value);
     return inputValues;
    }
  
    setEventListeners(){
      super.setEventListeners();
      this._buttonSelector.addEventListener('click', this.open.bind(this));
      this._popupSelector.addEventListener('submit', this._handleFormSubmit);
    }
   
    open(){
      this._popupSelector.querySelector('.form').reset();
      super.open();
    }
  }
  