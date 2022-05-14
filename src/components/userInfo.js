
export default class UserInfo{
    constructor(obj){
      // obj - информация на странице, а не в попапе
      this._nameSelector = document.querySelector(obj.nameSelector);
      this._infoSelector = document.querySelector(obj.infoSelector);
      this._avatarSelector = document.querySelector(obj.avatarSelector);

    }
  
    getUserInfo(){
      // берет данные со страницы и создает объект для автозаполнения форм попапа
      const pageInfo = new Object();
      pageInfo.name = this._nameSelector.textContent;
      pageInfo.info = this._infoSelector.textContent;
      return pageInfo;
    }
  
    setUserInfo(infoObj){
      this._authorId = infoObj._id;
      // принимает данные с сервера и вставляет их на страницу
      this._nameSelector.textContent = infoObj.name;
      this._infoSelector.textContent = infoObj.about;
      this._avatarSelector.src = infoObj.avatar;
    }
  }