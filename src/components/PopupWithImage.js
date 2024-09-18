import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".modal__image");
    this._caption = this._popupElement.querySelector(".modal__description");
  }

  open({ link, name }) {
    //set the image's src and alt
    this._image.src = link;
    this._image.alt = name;
    //set the caption's textContent
    this._caption.textContent = name;
    super.open();
  }
}