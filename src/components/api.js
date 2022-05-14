import { token } from './constant.js';
import { handleCardClick, handleDeleteClick, handleLikeClick, createCardElement } from '../pages/index.js'

export default class Api {
  constructor(user, cardsList) {
    this._user = user;
    this._cardsList = cardsList;
  }

  getInitialCards() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
      method: 'GET',
      headers: {
          authorization: token,
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((result) => {
      //создаем объект с карточками по-умолчанию и функцией, которая рисует одну карточку
      result.reverse().forEach(item => {
      const newCardElement = createCardElement(item, this._user._authorId, '.element-template', handleCardClick, handleDeleteClick, handleLikeClick);
      this._cardsList.addItem(newCardElement);
      })
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  getUserData() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-40/users/me', {
      method: 'GET',
      headers: {
        authorization: token,
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }    
    })
    .then((result) => {
      this._user.setUserInfo(result);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  updateUserData(popup, data) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-40/users/me', {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data[0],
        about: data[1],
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }    
    })  
    .then(result =>{
      this._user.setUserInfo(result);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(()=>  {
      popup.loading(false)
      popup.close();
    });
  }
  
  addNewCard(popup, data){
    fetch('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data[0],
        link: data[1]
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }    
    })
    .then((result) => {
        //создаем объект с карточками по-умолчанию и функцией, которая рисует одну карточку
        const newCardElement = createCardElement(result, this._user._authorId, '.element-template', handleCardClick, handleDeleteClick, handleLikeClick);
        this._cardsList.addItem(newCardElement);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(()=>  {
      popup.loading(false);
      popup.close();
    });  
  }

  deleteCard(popup, element, cardId){
    fetch(`https://mesto.nomoreparties.co/v1/cohort-40/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: token,
      }
    })
    .then(res => {
      if (res.ok) {
        element.remove();
        element = null;
        popup.close();
      } else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });  
  }

  deleteLike(cardObj, showLike){
    fetch(`https://mesto.nomoreparties.co/v1/cohort-40/cards/${cardObj._id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: token,
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }    
    })
    .then(res => {
      cardObj.likes = res.likes;
      showLike(false);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  addLike(cardObj, showLike){
    fetch(`https://mesto.nomoreparties.co/v1/cohort-40/cards/${cardObj._id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: token,
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }    
    })
    .then(res => {
      cardObj.likes = res.likes;
      showLike(true);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }

  updateAvatar(popup, data){
    fetch('https://mesto.nomoreparties.co/v1/cohort-40/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data[0],
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }    
    })
    .then(res => {
      this._user._avatarSelector.src = res.avatar;
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(()=>  {
      popup.close();
      popup.loading(false); 
    });
  
  }

// другие методы работы с API
}