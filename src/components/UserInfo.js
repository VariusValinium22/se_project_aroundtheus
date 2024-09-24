export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      title: this._nameElement.textContent,
      description: this._jobElement.textContent,
    };
  }

  setUserInfo({ title, description }) {
    this._nameElement.textContent = title;
    this._jobElement.textContent = description;
  }
  
  setUserAvatar( { avatar } ) { 
    this._avatarElement.src = avatar;
  }
}
