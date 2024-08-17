export default class Card {
    constructor(data, cardSelector, handleImageClick, previewImageModal, modalImage, imageDescription) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._previewImageModal = previewImageModal;
        this._modalImage = modalImage;
        this._imageDescription = imageDescription;
    }

    _setEventListeners() {
        //card__like-button
        this._cardElement.querySelector(".card__like-button").addEventListener("click", () => {
            this._handleLikeIcon();
        });

        //card__delete-button
        this._cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
            this._handleDeleteCard();
        });

        //card image
        this._cardElement.querySelector(".card__image").addEventListener('click', () => {
            this._handleImageClick({ link: this._link, name: this._link });
        });
    }   

    _handleLikeIcon() {
        this._cardElement.querySelector(".card__like-button").classList.toggle("card__like-button_active");
    }

    _handleDeleteCard() {
        console.log(this._cardElement);
        this._cardElement.remove();
        this._cardElement = null;
    }

    getView() {
        this._cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
        // set the card image and title
        const cardImage = this._cardElement.querySelector(".card__image");
        cardImage.src = this._link;
        cardImage.alt = this._name;
        const cardTitle = this._cardElement.querySelector(".card__title");
        cardTitle.textContent = this._name;
        // seteventListeners
        this._setEventListeners();
        // return the card
        return this._cardElement;
    }
}
