import  PopupWithForm  from './popupWithForm.js';

export default class PopupWithUserInfo extends PopupWithForm{
    constructor(popupSelector, buttonSelector, handleFormSubmit, fillPopupForm){
      super(popupSelector, buttonSelector, handleFormSubmit);
      this._fillPopupForm = fillPopupForm;
    }
  
  open(){
    super.open();
    this._fillPopupForm();
  }
  }
  