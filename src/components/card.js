
export class Card{
  constructor(cardObj, template, handleCardClick, handleDeleteClick, handleLikeClick){
    this._cardObj = cardObj;
    this._template = template;
    this._handleCardClick = handleCardClick; //1 callback what tro do if someone'll click on pic
    this._handleDeleteClick = handleDeleteClick; // 2 callback what to do if someone'll click on delete icon
    this._handleLikeClick = handleLikeClick; // 3 callback what to do if someone'll click on like icon
    this._cardElement = this._getTameplate(); //создали элемент взяв из этого же класса балванку
    this._likeBtn = this._cardElement.querySelector('.button_type_like');
    this._likeCounter = this._cardElement.querySelector('.element__like-counter');
    this._showLikeF = this._showLike.bind(this);
    this._deleteElementF = this._deleteElement.bind(this);
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
  
  // удаление карточки
  _deleteElement(){
    this._cardElement.remove(); //что значит занулить?
    this._cardElement = null;
  }

  _showLike(isLiked){
    if (isLiked) {
      this._likeBtn.classList.add('active');
    } else {
      this._likeBtn.classList.remove('active');
    }
    this._likeCounter.textContent = this._cardObj.likes.length;
  }

  //вешаем слушатели
  _setEventListeners(){
    //кнопка лайка
    this._cardElement.querySelector('.button_type_like').addEventListener('click', ()=>{
      this._handleLikeClick(this._cardObj, this._showLikeF);
    });
    //кнопка корзина
    this._cardElement.querySelector('.button_type_delete').addEventListener('click', ()=>{
      this._handleDeleteClick(this._cardObj._id, this._deleteElementF);
    });
    //открыть картинку на весь
    this._cardElement.querySelector('.element__image').addEventListener('click', ()=>{
      this._handleCardClick(this._cardObj.name, this._cardObj.link);
    });
  }

  //собрать готовую карточку со всеми наворотами
  generateCard(authorId){ 
    this._likeCounter.textContent = this._cardObj.likes.length; // вывели количество лайков
    if (this._cardObj.owner._id === authorId){ // добавляем кнопку удаления только для "наших" карточек
      this._cardElement.querySelector('.button_type_delete').disabled = false;
      this._cardElement.querySelector('.button_type_delete').classList.remove('button_status_invisible');
    };

    if (this._cardObj.likes.some(e => e._id === authorId)){
      this._showLike(true);
    }

    const cardImage = this._cardElement.querySelector('.element__image'); //заполняем балванку актуальными данными
    cardImage.src = this._cardObj.link;
    this._cardElement.querySelector('.element__title').textContent  = this._cardObj.name;
    cardImage.alt = this._cardObj.name;
    this._setEventListeners();
    return this._cardElement; //готовая карточка
  }
}


