export default class Popup {
  constructor(popupSelector){
    this._popupSelector = document.querySelector(popupSelector);
  }

  open(){
    //как передать функции ивент
    this._popupSelector.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose.bind(this))
    this.setEventListeners()
  }

  close(){
    this._popupSelector.classList.remove('popup_active');
    // console.log('check');
    // document.removeEventListener('keydown', this._handleEscClose)
    // Почему-то слушатели не снимаются, сначала 1 чек, потом 3, потом много :) 
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