const elementTemplate = document.querySelector('.element-template');//балванка для новых карточек
const elementsList = document.querySelector('.elements__list');//список карточек
const imagePopup = document.querySelector('.popup_content_image');//окно с картинкой на весь экран
const imagePopupCloseBtn = imagePopup.querySelector('.popup__close-btn');//кнопка закрыть картинку на весь экран
const openEditProfile = document.querySelector('.button_type_edit');//кнопка открыть окно редактирования профиля
const popupEditProfile = document.querySelector('.popup_content_edit-profile');// попап редактирования профиля
const closeEditProfile = popupEditProfile.querySelector('.button_type_close');//кнопка закрыть окно редактирования профиля
const formEditProfile = document.querySelector('.form_content_edit-profile');//формы в окне изменения информации профиля
const nameInput = document.querySelector('.form__item_el_name');// форма имя
const aboutMeInput = document.querySelector('.form__item_el_about-me');// форма обо мне
const myName = document.querySelector('.profile__name');// имя в профиле
const aboutMe = document.querySelector('.profile__about-me'); // обо мне в профиле
const popupAddCard = document.querySelector('.popup_content_add-card');//попап для добавления новой карточки
const closeAddCard = popupAddCard.querySelector('.button_type_close');//кнопка закрыть окно добавления новых картинок
const formAddCard = document.querySelector('.form_content_add-card');// форма с добавлением новой картинки
const placeNameInput = document.querySelector('.form__item_el_place-name');//форма с названием карточки
const placeImgInput = document.querySelector('.form__item_el_place-img');//форма с ссылкой на картинку
const openAddCard = document.querySelector('.button_type_add'); //кнопка добавить карточки
const popupImg = document.querySelector('.popup__img'); // картинка на весь экран
const popupTitle = document.querySelector('.popup__title'); // подпись под картинками на весь экран
const altText = 'изображение'; // все картинки - это изображения
//const popupSaveBtn = document.querySelector('.popup__save-btn');

//открытие попапа
function closeOnEscape(event, popup){
  if(event.key === 'Escape'){
    closePopup(popup);
  }
}
function openPopup(popup){
  popup.classList.add('popup_active');
  document.addEventListener('keydown', function(event){
    closeOnEscape(event, popup)
  }) //как передать функции ивент

}

// закрытие попапа
function closePopup(popup){
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closeOnEscape)
}

// открыть картинку на весь экран
function openImagePopup(name, link){
  popupImg.src = link;
  popupImg.alt = altText;
  popupTitle.textContent = name;
  openPopup(imagePopup);
}

// закрыть картинку на весь экран
function closeImagePopup(){
  closePopup(imagePopup);
}

//открытие формы редактирования профиля
function openPopupEditProfile () {
  nameInput.value = myName.textContent;
  aboutMeInput.value = aboutMe.textContent;
  popupSaveBtn = popupEditProfile.querySelector('.popup__save-btn');
  popupSaveBtn.classList.add('popup__save-btn_inactive');
  popupSaveBtn.setAttribute('disabled','disabled')
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
  popupSaveBtn.classList.add('popup__save-btn_inactive');
  popupSaveBtn.setAttribute('disabled','disabled')
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
// лайк
function addLike(event){
  event.target.classList.toggle('active');
}
// удаление карточки
function deleteElement(event){
  event.target.closest('.element').remove();
}

function renderCard (cardElement){
  elementsList.prepend(cardElement);
}
// функция создающая карточки из балванки, сразу добавляет обработчик на кнопки лайк, открыть на весь экран и удалить
function getCardElement(name, link) {
  const newCardElement = elementTemplate.content.cloneNode(true).querySelector('.element');
  newCardElement.querySelector('.element__title').textContent = name;
  newCardElement.querySelector('.element__image').src = link;
  newCardElement.querySelector('.element__image').alt = altText;
  const newCardLikeButton = newCardElement.querySelector('.button_type_like');
  newCardLikeButton.addEventListener('click', addLike);
  const newCardDeleteButton = newCardElement.querySelector('.button_type_delete');
  newCardDeleteButton.addEventListener('click', deleteElement);
  const newCardImageButton = newCardElement.querySelector('.element__image');
  newCardImageButton.addEventListener('click', () => openImagePopup(name, link));
  renderCard(newCardElement)
}

// функция, добавляющая карточки из попапа
function handleAddCardSubmit (event) {
  event.preventDefault();
  //замена данных на новые
  getCardElement(placeNameInput.value, placeImgInput.value);
  formAddCard.reset();

  //закрыть окнопопап
  closePopupAddCard();
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

imagePopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
    closeImagePopup(imagePopup);
  }
});

// сохранение новой карточки
formAddCard.addEventListener('submit', handleAddCardSubmit);
//открыть попап добавление новых картинок
openAddCard.addEventListener('click', openPopupAddCard);
// карточки по умолчанию
initialCards.forEach(data => {
  getCardElement(data.name, data.link);
});
// Обновление информации профиля
formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
// открыть попап редактирования профиля
openEditProfile.addEventListener('click', openPopupEditProfile);


