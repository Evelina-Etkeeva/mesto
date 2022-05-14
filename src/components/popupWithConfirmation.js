import Popup from './popup.js';

export default class PopupDeleteCard extends Popup{
    constructor(popupSelector, handleDeleteSubmit){
      super(popupSelector);
      this._handleDeleteSubmit = handleDeleteSubmit;
    }
    
    open(cardId, deleteElement){
        super.open();
        this._deleteElement = deleteElement;
        this._cardId = cardId;
    }

    setEventListeners(){
      super.setEventListeners();
      this._popupSelector.addEventListener('submit', () => this._handleDeleteSubmit(this._cardId, this._deleteElement));
    }  
  }
  