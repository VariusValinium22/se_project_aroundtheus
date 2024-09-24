export default class AvatarInfo {
    constructor({ avatarImg }) {
        this._avatarImg = document.querySelector(avatarImg);
    }
    getAvatarInfo() {
        return {
            avatar: this._avatarImg.src,
        };
    }

    setAvatarInfo({ avatar }) {
        this._avatarImg.src = avatar;
    }
}
