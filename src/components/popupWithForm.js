import Popup from './popup.js';

export default class PopupWithForm extends Popup{
    constructor(popupSelector, buttonSelector, handleFormSubmit){
      super(popupSelector);
      this.buttonSelector = document.querySelector(buttonSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._inputValues = this._popupSelector.querySelectorAll('.form__item');
      this._getData = this._getInputValues.bind(this)
      this._submitButton = this._popupSelector.querySelector('.button_type_save');
    }
    _getInputValues(){
      const inputValues = Array.from(this._inputValues).map((item)=>{ 
        return item.value;
      })
      // const inputValues = {name: this._inputValues[0].value, info: this._inputValues[1].value};
      return inputValues;
    }
  
    setEventListeners(){
      super.setEventListeners();
      this._popupSelector.addEventListener('submit', () => this._handleFormSubmit(this._getData));
    }
   
    close(){
      this._popupSelector.querySelector('.form').reset();
      super.close();
    }

    loading(isLoading){
      if (isLoading) {
        this._submitButton.textContent = 'Сохранение...';
    }
  }
  }
