export const elementsList = document.querySelector('.elements__list');//список карточек
export const openEditProfile = document.querySelector('.button_type_edit');//кнопка открыть окно редактирования профиля
export const popupEditProfile = document.querySelector('.popup_content_edit-profile');// попап редактирования профиля
export const formEditProfile = document.querySelector('.form_content_edit-profile');//формы в окне изменения информации профиля
export const nameInput = document.querySelector('.form__item_el_name');// форма имя
export const aboutMeInput = document.querySelector('.form__item_el_about-me');// форма обо мне
export const myName = document.querySelector('.profile__name');// имя в профиле
export const aboutMe = document.querySelector('.profile__about-me'); // обо мне в профиле
export const popupAddCard = document.querySelector('.popup_content_add-card');//попап для добавления новой карточки
export const formAddCard = document.querySelector('.form_content_add-card');// форма с добавлением новой картинки

export const placeNameInput = document.querySelector('.form__item_el_place-name');//форма с названием карточки
export const placeImgInput = document.querySelector('.form__item_el_place-img');//форма с ссылкой на картинку
export const openAddCard = document.querySelector('.button_type_add'); //кнопка добавить карточки

export const validationDict = {
    formSelector: '.form',
    inputSelector:  '.form__item',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_inactive',
    inputErrorClass: 'form__item-error',
    errorClass: 'form__error_active'
  }; //словарь для валидации форм
  