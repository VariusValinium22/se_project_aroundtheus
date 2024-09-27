export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    /* this._handleDeleteClick = handleDeleteClick; */
    // put handleDeleteClick in constructor
  }

  _setEventListeners() {
    //card__like-button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    //card__delete-button
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
        /* this._handleDeleteClick(); */
      });

    //card image
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ link: this._link, name: this._name });
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    // set the card image and title
    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__title");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
