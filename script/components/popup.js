export class Popup {
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
    // Почему-то слушатели не снимаются. 
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
  constructor(popupSelector){
    super(popupSelector);
  }
  openImgCard(){
    const cardSelector = event.target;
    const altText = 'изображение'; // все картинки - это изображения
    this._popupSelector.querySelector('.popup__img').src = cardSelector.src;
    this._popupSelector.alt = altText;
    this._popupSelector.querySelector('.popup__title').textContent = cardSelector.closest('.element').querySelector('.element__title').textContent;
    super.open();
  }
}


export class PopupWithForm extends Popup{
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

export class PopupWithUserInfo extends PopupWithForm{
  constructor(popupSelector, buttonSelector, handleFormSubmit, fillPopupForm){
    super(popupSelector, buttonSelector, handleFormSubmit);
    this._fillPopupForm = fillPopupForm;
  }

open(){
  super.open();
  this._fillPopupForm();
}

}

export class UserInfo{
  constructor(obj){
    // obj - информация на странице, а не в попапе
    this._nameSelector = obj.nameSelector;
    this._infoSelector = obj.infoSelector;
  }

  getUserInfo(){
    // берет данные со страницы и создает объект для автозаполнения форм попапа
    const pageInfo = new Object();
    pageInfo.name = this._nameSelector.textContent;
    pageInfo.info = this._infoSelector.textContent;
    return pageInfo;
  }

  setUserInfo(popupInfo){
    // принимает данные из попапа и вставляет их на страницу
    this._nameSelector.textContent = popupInfo.name;
    this._infoSelector.textContent = popupInfo.info;
  }
}

