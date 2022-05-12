import Popup from './popup.js';

export default class PopupDeleteCard extends Popup{
    constructor(popupSelector, handleDeleteSubmit){
      super(popupSelector);
      this._handleDeleteSubmit = handleDeleteSubmit;
    }
    
    open(element){
        super.open();
        this._element = element;
    }

    setEventListeners(){
      super.setEventListeners();
      this._popupSelector.addEventListener('submit', () => this._handleDeleteSubmit(this._element));
    }  
  }
  