import Popup from './popup.js';

export default class PopupDeleteCard extends Popup{
    constructor(popupSelector, handleDeleteSubmit){
      super(popupSelector);
      this._handleDeleteSubmit = handleDeleteSubmit;
    }
    
    open(element, cardId){
        super.open();
        this._element = element;
        this._cardId = cardId;
    }

    setEventListeners(){
      super.setEventListeners();
      this._popupSelector.addEventListener('submit', () => this._handleDeleteSubmit(this._element, this._cardId));
    }  
  }
  