//console.log("hi");

let edit = document.querySelector('.edit_button');
// console.log(edit);
let form = document.querySelector('.form');
//console.log(form);
let exit = document.querySelector('.close_button');
//console.log(exit);
let page = document.querySelector('.page');
//console.log(page);
let formBackground = document.querySelector('.form__background');
console.log(formBackground);


document.querySelector('.form__item_el_name').placeholder = document.querySelector('.profile__name').textContent;
document.querySelector('.form__item_el_about_me').placeholder = document.querySelector('.profile__about_me').textContent;


function open_form (event) {
  event.preventDefault();
  form.classList.add('js_form_active');
  page.classList.add('page_no_scroll');
}

function close_form (event) {
  event.preventDefault();
  form.classList.remove('js_form_active');
  page.classList.remove('page_no_scroll');
}

edit.addEventListener('click', open_form);

exit.addEventListener('click', close_form);
formBackground.addEventListener('click', close_form);

// форма имя
let nameInput = document.querySelector('.form__item_el_name');
//console.log(nameInput);
// форма обо мне
let aboutMeInput = document.querySelector('.form__item_el_about_me');
//кнопка
let formElementSaveButton = document.querySelector('.save_button');
// имя в профиле
let myName = document.querySelector('.profile__name');
//console.log(myName.textContent);
// обо мне в профиле
let aboutMe = document.querySelector('.profile__about_me');// Воспользуйтесь инструментом .querySelector
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (event) {
    event.preventDefault();
    myName.textContent = nameInput.value;
    aboutMe.textContent = aboutMeInput.value;
    form.classList.remove('js_form_active');
    page.classList.remove('page_no_scroll');

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent

}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementSaveButton.addEventListener('click', formSubmitHandler);
