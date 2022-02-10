

export const imagePopup = document.querySelector('.popup_content_image');
export const popupImg = imagePopup.querySelector('.popup__img'); // картинка на весь экран
export const popupTitle = document.querySelector('.popup__title'); // подпись под картинками на весь экран
export const formAddCard = document.querySelector('.form_content_add-card');// форма с добавлением новой картинки
export function openPopup(popup){
  document.addEventListener('keydown', closeOnEscape)
  //как передать функции ивент
  popup.classList.add('popup_active');
}

 function closeOnEscape(event){
  if(event.key === 'Escape'){
    const popup = document.querySelector('.popup_active');
    closePopup(popup);
  }
}

// закрытие попапа
export function closePopup(popup){
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closeOnEscape);
}
