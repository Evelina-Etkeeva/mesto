export default class Section {
  constructor(obj, containerSelector) {
    this._items = obj.items; //1.массив с данными, например карточки с картинками по-умолчанию
    this._renderer = obj.renderer; //2.функция, которая умеет рисовать одну карточку
    this._container = document.querySelector(containerSelector); //куда всю эту красоту девать
  }

  // заставим 2. отрисовать все элементы 1.
  renderItems() {
    this._items.forEach(element => {
      const cardElement = this._renderer(element);
      this.addItem(cardElement);
    });
  }
  //добавим готовые элементы на страницу
  addItem(element) {
    this._container.prepend(element);
  }
}
