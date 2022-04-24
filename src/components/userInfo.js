
export default class UserInfo{
    constructor(obj){
      // obj - информация на странице, а не в попапе
      this._nameSelector = document.querySelector(obj.nameSelector);
      this._infoSelector = document.querySelector(obj.infoSelector);
    }
  
    getUserInfo(){
      // берет данные со страницы и создает объект для автозаполнения форм попапа
      const pageInfo = new Object();
      pageInfo.name = this._nameSelector.textContent;
      pageInfo.info = this._infoSelector.textContent;
      return pageInfo;
    }
  
    setUserInfo(popupInfo){
      // принимает данные из попапа и вставляет их на страницу
      this._nameSelector.textContent = popupInfo.name;
      this._infoSelector.textContent = popupInfo.info;
    }
  }