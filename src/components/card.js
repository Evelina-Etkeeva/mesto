
export class Card{
  constructor(name, img, template, handleCardClick){
    this._name = name;
    this._img = img;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  //выбрали балванку
  _getTameplate(){
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  // //функция для лайка
  _addLike(){
    this._cardElement.querySelector('.button_type_like').classList.toggle('active');
  }
  // удаление карточки
  _deleteElement(){
    this._cardElement.remove(); //что значит занулить?
    this._cardElement = null;
  }
  

  //вешаем слушатели
  _setEventListeners(){
    //кнопка лайка
    this._cardElement.querySelector('.button_type_like').addEventListener('click', ()=>{
      this._addLike();
    });
    //кнопка корзина
    this._cardElement.querySelector('.button_type_delete').addEventListener('click', ()=>{
      this._deleteElement();
    });
    //открыть картинку на весь
    this._cardElement.querySelector('.element__image').addEventListener('click', ()=>{
      this._handleCardClick(this._name, this._img);
    });
  }

  //собрать готовую карточку со всеми наворотами
  generateCard(){
    this._cardElement = this._getTameplate(); //создали элемент взяв из этого же класса балванку
    this._setEventListeners();
    this._cardElement.querySelector('.element__image').src = this._img; //заполняем балванку актуальными данными
    this._cardElement.querySelector('.element__title').textContent  = this._name;
    return this._cardElement; //готовая карточка
  }
}


