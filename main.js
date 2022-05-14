(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._dict=e,this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._dict.inputSelector)),this._buttonElement=this._formElement.querySelector(this._dict.submitButtonSelector)}var n,r;return n=t,(r=[{key:"_showFormInputError",value:function(e,t){var n=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(this._dict.inputErrorClass),n.classList.add(this._dict.errorClass),n.textContent=t}},{key:"_hideFormInputError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._dict.inputErrorClass),t.classList.remove(this._dict.errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){this._showFormInputError(e,e.validationMessage),e.validity.valid?this._hideFormInputError(e):this._showFormInputError(e,e.validationMessage)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_makeButtonInactive",value:function(){this._buttonElement.classList.add(this._dict.inactiveButtonClass),this._buttonElement.disabled=!0}},{key:"_makeButtonActive",value:function(){this._buttonElement.classList.remove(this._dict.inactiveButtonClass),this._buttonElement.disabled=!1}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this._makeButtonInactive():this._makeButtonActive()}},{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()})),e._formElement.addEventListener("submit",(function(t){t.preventDefault(),e._makeButtonInactive()}))}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n,r,o,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._cardObj=t,this._template=n,this._handleCardClick=r,this._handleDeleteClick=o,this._handleLikeClick=i,this._cardElement=this._getTameplate(),this._likeBtn=this._cardElement.querySelector(".button_type_like"),this._likeCounter=this._cardElement.querySelector(".element__like-counter"),this._showLikeF=this._showLike.bind(this),this._deleteElementF=this._deleteElement.bind(this)}var t,r;return t=e,(r=[{key:"_getTameplate",value:function(){return document.querySelector(this._template).content.querySelector(".element").cloneNode(!0)}},{key:"_deleteElement",value:function(){this._cardElement.remove(),this._cardElement=null}},{key:"_showLike",value:function(e){e?this._likeBtn.classList.add("active"):this._likeBtn.classList.remove("active"),this._likeCounter.textContent=this._cardObj.likes.length}},{key:"_setEventListeners",value:function(){var e=this;this._cardElement.querySelector(".button_type_like").addEventListener("click",(function(){e._handleLikeClick(e._cardObj,e._showLikeF)})),this._cardElement.querySelector(".button_type_delete").addEventListener("click",(function(){e._handleDeleteClick(e._cardObj._id,e._deleteElementF)})),this._cardElement.querySelector(".element__image").addEventListener("click",(function(){e._handleCardClick(e._cardObj.name,e._cardObj.link)}))}},{key:"generateCard",value:function(e){this._likeCounter.textContent=this._cardObj.likes.length,this._cardObj.owner._id===e&&(this._cardElement.querySelector(".button_type_delete").disabled=!1,this._cardElement.querySelector(".button_type_delete").classList.remove("button_status_invisible")),this._cardObj.likes.some((function(t){return t._id===e}))&&this._showLike(!0);var t=this._cardElement.querySelector(".element__image");return t.src=this._cardObj.link,this._cardElement.querySelector(".element__title").textContent=this._cardObj.name,t.alt=this._cardObj.name,this._setEventListeners(),this._cardElement}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}(),o=document.querySelector(".form_content_edit-profile"),i=document.querySelector(".form_content_edit-avatar"),c=document.querySelector(".form_content_add-card"),a={formSelector:".form",inputSelector:".form__item",submitButtonSelector:".popup__save-btn",inactiveButtonClass:"popup__save-btn_inactive",inputErrorClass:"form__item-error",errorClass:"form__error_active"};function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=t,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){var n=t._renderer(e);t.addItem(n)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var f=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupSelector=document.querySelector(t),this._escAction=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popupSelector.classList.add("popup_active"),document.addEventListener("keydown",this._escAction)}},{key:"close",value:function(){this._popupSelector.classList.remove("popup_active"),document.removeEventListener("keydown",this._escAction)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popupSelector.addEventListener("click",(function(t){(t.target.classList.contains("popup")||t.target.classList.contains("popup__close-btn"))&&e.close()}))}}])&&s(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function p(e){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p(e)}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(){return d="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=y(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},d.apply(this,arguments)}function y(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=b(e)););return e}function _(e,t){return _=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},_(e,t)}function v(e,t){if(t&&("object"===p(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return m(e)}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function b(e){return b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},b(e)}var k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_(e,t)}(c,e);var t,n,r,o,i=(r=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=b(r);if(o){var n=b(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return v(this,e)});function c(e,t,n){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(r=i.call(this,e)).buttonSelector=document.querySelector(t),r._handleFormSubmit=n,r._inputValues=r._popupSelector.querySelectorAll(".form__item"),r._getData=r._getInputValues.bind(m(r)),r._submitButton=r._popupSelector.querySelector(".button_type_save"),r}return t=c,(n=[{key:"_getInputValues",value:function(){return Array.from(this._inputValues).map((function(e){return e.value}))}},{key:"setEventListeners",value:function(){var e=this;d(b(c.prototype),"setEventListeners",this).call(this),this._popupSelector.addEventListener("submit",(function(){return e._handleFormSubmit(e._getData)}))}},{key:"close",value:function(){this._popupSelector.querySelector(".form").reset(),d(b(c.prototype),"close",this).call(this)}},{key:"loading",value:function(e){this._submitButton.textContent=e?"Сохранение...":"Сохранить"}}])&&h(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),c}(f);function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var S=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameSelector=document.querySelector(t.nameSelector),this._infoSelector=document.querySelector(t.infoSelector),this._avatarSelector=document.querySelector(t.avatarSelector)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){var e=new Object;return e.name=this._nameSelector.textContent,e.info=this._infoSelector.textContent,e}},{key:"setUserInfo",value:function(e){this.authorId=e._id,this._nameSelector.textContent=e.name,this._infoSelector.textContent=e.about,this._avatarSelector.src=e.avatar}}])&&g(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function E(e){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},E(e)}function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function O(){return O="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=j(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},O.apply(this,arguments)}function j(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=P(e)););return e}function C(e,t){return C=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},C(e,t)}function L(e,t){if(t&&("object"===E(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function P(e){return P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},P(e)}var I=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&C(e,t)}(c,e);var t,n,r,o,i=(r=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=P(r);if(o){var n=P(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return L(this,e)});function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=i.call(this,e))._srcSelector=t._popupSelector.querySelector(".popup__img"),t._titleSelector=t._popupSelector.querySelector(".popup__title"),t}return t=c,(n=[{key:"openImgCard",value:function(e,t){this._srcSelector.src=t,this._srcSelector.alt=e,this._titleSelector.textContent=e,O(P(c.prototype),"open",this).call(this)}}])&&w(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),c}(f);function q(e){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},q(e)}function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function T(){return T="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=B(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},T.apply(this,arguments)}function B(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=A(e)););return e}function D(e,t){return D=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},D(e,t)}function U(e,t){if(t&&("object"===q(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function A(e){return A=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},A(e)}var x=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&D(e,t)}(c,e);var t,n,r,o,i=(r=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=A(r);if(o){var n=A(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return U(this,e)});function c(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(n=i.call(this,e))._handleDeleteSubmit=t,n}return t=c,(n=[{key:"open",value:function(e,t){T(A(c.prototype),"open",this).call(this),this._deleteElement=t,this._cardId=e}},{key:"setEventListeners",value:function(){var e=this;T(A(c.prototype),"setEventListeners",this).call(this),this._popupSelector.addEventListener("submit",(function(){return e._handleDeleteSubmit(e._cardId,e._deleteElement)}))}}])&&R(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),c}(f);function F(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var V=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t,this._headers=n}var t,n;return t=e,(n=[{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{method:"GET",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"getUserData",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{method:"GET",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"updateUserData",value:function(e){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e[0],about:e[1]})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"addNewCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e[0],link:e[1]})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){if(!e.ok)return Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"deleteLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"addLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"updateAvatar",value:function(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})})}}])&&F(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function J(e,t){$.openImgCard(e,t)}function M(e,t){X.open(e,t)}function G(e,t){e.likes.some((function(e){return e._id===K.authorId}))?Z.deleteLike(e._id).then((function(n){e.likes=n.likes,t(!1)})).catch((function(e){return console.log("Ошибка.....: ".concat(e))})):Z.addLike(e._id).then((function(n){e.likes=n.likes,t(!0)})).catch((function(e){return console.log("Ошибка.....: ".concat(e))}))}function H(e){return new r(e,".element-template",J,M,G).generateCard(K.authorId)}new t(a,o).enableValidation(),new t(a,c).enableValidation(),new t(a,i).enableValidation();var z=new l((function(e){return H(e)}),".elements__list"),$=new I(".popup_content_image");$.setEventListeners();var K=new S({nameSelector:".profile__name",infoSelector:".profile__about-me",avatarSelector:".profile__img"}),Q=new k(".popup_content_edit-profile",".button_type_edit",(function(e){Q.loading(!0);var t=e();Z.updateUserData(t).then((function(e){K.setUserInfo(e)})).catch((function(e){return console.log("Ошибка.....: ".concat(e))})).finally((function(){Q.loading(!1),Q.close()}))}));Q.buttonSelector.addEventListener("click",(function(){var e,t,n,r,o,i;Q.open(),e=K.getUserInfo(),o=Q._inputValues,i=2,n=(t=function(e){if(Array.isArray(e))return e}(o)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],c=!0,a=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);c=!0);}catch(e){a=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(a)throw o}}return i}}(o,i)||function(e,t){if(e){if("string"==typeof e)return N(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?N(e,t):void 0}}(o,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())[0],r=t[1],n.value=e.name,r.value=e.info})),Q.setEventListeners();var W=new k(".popup_content_add-card",".button_type_add",(function(e){W.loading(!0);var t=e();Z.addNewCard(t).then((function(e){var t=H(e);z.addItem(t)})).catch((function(e){return console.log("Ошибка.....: ".concat(e))})).finally((function(){W.loading(!1),W.close()}))}));W.buttonSelector.addEventListener("click",(function(){return W.open()})),W.setEventListeners();var X=new x(".popup_content_delete-card",(function(e,t){event.preventDefault(),Z.deleteCard(e).then((function(){t(),X.close()})).catch((function(e){return console.log("Ошибка.....: ".concat(e))}))}));X.setEventListeners();var Y=new k(".popup_content_edit-avatar",".profile__img",(function(e){event.preventDefault(),Y.loading(!0);var t=e();Z.updateAvatar(t[0]).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){K.setUserInfo(e)})).catch((function(e){return console.log("Ошибка.....: ".concat(e))})).finally((function(){Y.close(),Y.loading(!1)}))}));Y.buttonSelector.addEventListener("click",(function(){Y.open()})),Y.setEventListeners();var Z=new V("https://mesto.nomoreparties.co/v1/cohort-40",{authorization:"a81905a8-70e9-49b5-82c2-f5f8e94b1f23","Content-Type":"application/json"});Promise.all([Z.getUserData(),Z.getInitialCards()]).then((function(e){K.setUserInfo(e[0]),z.renderItems(e[1].reverse())})).catch((function(e){return console.log("Ошибка.....: ".concat(e))}))})();