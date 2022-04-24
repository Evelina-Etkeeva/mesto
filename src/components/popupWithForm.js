import Popup from './popup.js';

export default class PopupWithForm extends Popup{
    constructor(popupSelector, buttonSelector, handleFormSubmit){
      super(popupSelector);
      this._buttonSelector = document.querySelector(buttonSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._inputValues = this._popupSelector.querySelectorAll('.form__item');
      this._getData = this._getInputValues.bind(this)
    }
    _getInputValues(){
      const inputValues = {name: this._inputValues[0].value, info: this._inputValues[1].value};
      return inputValues;
    }
  
    setEventListeners(){
      super.setEventListeners();
      this._buttonSelector.addEventListener('click', () => this.open());
      this._popupSelector.addEventListener('submit', () => this._handleFormSubmit(this._getData));
    }
   
    close(){
      this._popupSelector.querySelector('.form').reset();
      super.close();
    }
  }
  