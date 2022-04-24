export default class Popup {
  constructor(popupSelector){
    this._popupSelector = document.querySelector(popupSelector);
    this._escAction = this._handleEscClose.bind(this)
  }

  open(){
    //как передать функции ивент
    this._popupSelector.classList.add('popup_active');
    document.addEventListener('keydown', this._escAction)
  }

  close(){
    this._popupSelector.classList.remove('popup_active');
    document.removeEventListener('keydown', this._escAction)
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