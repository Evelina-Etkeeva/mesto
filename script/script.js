
const elementsList = document.querySelector('.elements__list');//список карточек
const imagePopup = document.querySelector('.popup_content_image');
const openEditProfile = document.querySelector('.button_type_edit');//кнопка открыть окно редактирования профиля
const popupEditProfile = document.querySelector('.popup_content_edit-profile');// попап редактирования профиля
const formEditProfile = document.querySelector('.form_content_edit-profile');//формы в окне изменения информации профиля
const nameInput = document.querySelector('.form__item_el_name');// форма имя
const aboutMeInput = document.querySelector('.form__item_el_about-me');// форма обо мне
const myName = document.querySelector('.profile__name');// имя в профиле
const aboutMe = document.querySelector('.profile__about-me'); // обо мне в профиле
const popupAddCard = document.querySelector('.popup_content_add-card');//попап для добавления новой карточки
const formAddCard = document.querySelector('.form_content_add-card');// форма с добавлением новой картинки
const placeNameInput = document.querySelector('.form__item_el_place-name');//форма с названием карточки
const placeImgInput = document.querySelector('.form__item_el_place-img');//форма с ссылкой на картинку
const openAddCard = document.querySelector('.button_type_add'); //кнопка добавить карточки
const classInactive = 'popup__save-btn_inactive'; // класс неактивной кнопки
//const popupSaveBtn = document.querySelector('.popup__save-btn');

//закрытие по кнопке esc
function closeOnEscape(event){
  if(event.key === 'Escape'){
    const popup = document.querySelector('.popup_active')
    closePopup(popup);
  }
}
//открытие попапа
function openPopup(popup){
  document.addEventListener('keydown', closeOnEscape)
  //как передать функции ивент
  popup.classList.add('popup_active');
}

// закрытие попапа
function closePopup(popup){
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closeOnEscape)
}

// открыть картинку на весь экран
// function openImagePopup(name, link){
//   popupImg.src = link;
//   popupImg.alt = altText;
//   popupTitle.textContent = name;
//   openPopup(imagePopup);
// }

// закрыть картинку на весь экран
// function closeImagePopup(){
//   closePopup(imagePopup);
// }
// сделать кнопку сохранить неактивной
// хотела вставить ее импортом из файла валидации, но не поняла как

function makeButtonInactive(buttonElement, btnClass){
  buttonElement.classList.add(btnClass);
  buttonElement.disabled = true;
}

//открытие формы редактирования профиля
function openPopupEditProfile () {
  nameInput.value = myName.textContent;
  aboutMeInput.value = aboutMe.textContent;
  popupSaveBtn = popupEditProfile.querySelector('.popup__save-btn');
  makeButtonInactive(popupSaveBtn, classInactive);
  openPopup(popupEditProfile);
}

//закрытие формы редактирования профиля без сохранения
function closePopupEditProfile () {
  closePopup(popupEditProfile);
  nameInput.value = myName.textContent;
  aboutMeInput.value = aboutMe.textContent;
}

//открытие формы добавления картинки
function openPopupAddCard () {
  popupSaveBtn = popupAddCard.querySelector('.popup__save-btn');
  makeButtonInactive(popupSaveBtn, classInactive);
  openPopup(popupAddCard);
}

//закрытие формы добавления картинки без сохранения
function closePopupAddCard () {
  closePopup(popupAddCard);
  formAddCard.reset();
}

// функция, сохраняющая новую информацию в профиль
function handleEditProfileFormSubmit (event) {
    event.preventDefault();
    //замена данных на новые
    myName.textContent = nameInput.value;
    aboutMe.textContent = aboutMeInput.value;
    //закрыть окнопопап
    closePopup(popupEditProfile);
}


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
  _closeImagePopup(){
    closePopup(imagePopup);
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
    //?Может стоит сделать класс для всех попапов?
    imagePopup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        this._closeImagePopup(imagePopup);
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

//добавление новой картинки в галерею
function handleAddCardSubmit (event) {
  event.preventDefault();
  //замена данных на новые
  const newCard = new Card(placeNameInput.value, placeImgInput.value)
  const cardElement = newCard.generateCard();
  formAddCard.reset();

  //закрыть окнопопап
  closePopupAddCard();
  elementsList.prepend(cardElement);
}

//закрытие кликом на оверлей или кнопку
popupEditProfile.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
    closePopup(popupEditProfile);
  }
});

popupAddCard.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
    closePopup(popupAddCard);
  }
});



// сохранение новой карточки
formAddCard.addEventListener('submit', handleAddCardSubmit);
//открыть попап добавление новых картинок
openAddCard.addEventListener('click', openPopupAddCard);
// карточки по умолчанию
initialCards.forEach(data => {
  const initCard = new Card(data.name, data.link, '.element-template');
  const initCardElement = initCard.generateCard();
  elementsList.prepend(initCardElement);
});
// Обновление информации профиля
formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
// открыть попап редактирования профиля
openEditProfile.addEventListener('click', openPopupEditProfile);


