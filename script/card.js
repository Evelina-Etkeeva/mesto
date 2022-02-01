const imagePopup = document.querySelector('.popup_content_image');

class Card{
  constructor(name, img){
    this._name = name;
    this._img = img;
  }

  //выбрали балванку
  _getTameplate(){
    const cardElement = document
      .querySelector('.element-template')
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  // //функция для айка
  _addLike(){
    this._cardElement.querySelector('.button_type_like').classList.toggle('active');
  }
  // удаление карточки
  _deleteElement(){
    this._cardElement.querySelector('.button_type_delete').closest('.element').remove();
  }
  //открыть картинку на весь экран
  _openImagePopup(){
    //окно с картинкой на весь экран
    const popupImg = document.querySelector('.popup__img'); // картинка на весь экран
    const popupTitle = document.querySelector('.popup__title'); // подпись под картинками на весь экран
    const altText = 'изображение'; // все картинки - это изображения
    popupImg.src = this._img;
    popupImg.alt = altText;
    popupTitle.textContent = this._name;
    openPopup(imagePopup);
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
      this._openImagePopup();
    });
    //закрыть картину на весь экран
    imagePopup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        closePopup(imagePopup);
      }
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
