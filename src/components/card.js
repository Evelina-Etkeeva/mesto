
export class Card{
  constructor(name, img, template, handleCardClick, handleDeleteClick){
    this._name = name;
    this._img = img;
    this._template = template;
    this._handleCardClick = handleCardClick; //1 callback what tro do if someone'll click on pic
    this._handleDeleteClick = handleDeleteClick; // 2 callback what to do if someone'll click on delet icon
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
    const counter = Number(this._cardElement.querySelector('.element__like-counter').textContent);
    console.log(Number(this._cardElement.querySelector('.element__like-counter').textContent));
    this._cardElement.querySelector('.element__like-counter').textContent =counter+1;
  }
  

  //вешаем слушатели
  _setEventListeners(){
    //кнопка лайка
    this._cardElement.querySelector('.button_type_like').addEventListener('click', ()=>{
      this._addLike();
    });
    //кнопка корзина
    this._cardElement.querySelector('.button_type_delete').addEventListener('click', ()=>{
      this._handleDeleteClick();
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
    const cardImage = this._cardElement.querySelector('.element__image'); //заполняем балванку актуальными данными
    cardImage.src = this._img;
    this._cardElement.querySelector('.element__title').textContent  = this._name;
    cardImage.alt = this._name;
    return this._cardElement; //готовая карточка
  }
}


