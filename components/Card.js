export default class Card {
    constructor({name, link}, cardSelector) {
        console.log(name, link, cardSelector);
        console.log(this);// this = the card object
        this._name = name;
        console.log(this);
        this._link = link;
        console.log(this);
        this._cardSelector = cardSelector;
        console.log(this);
    }

    _setEventListeners() {
        console.log('setEventListener is working');
        //card__like-button
        this._cardElement.querySelector(".card__like-button").addEventListener("click", () => {
            this._handleLikeIcon();
        });

        //card__delete-button
        this._cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
            this._handleDeleteCard();
        });
    }   

    _handleLikeIcon() {
        this._cardElement.querySelector(".card__like-button").classList.toggle("card__like-button_is-active");
    }

    _handleDeleteCard() {
        console.log(this._cardElement);
        this._cardElement.remove();
        this._cardElement = null;
    }

    getView() {
        this._cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
        console.log(this._cardElement);
        // get the card view
        // seteventListeners
        this._setEventListeners();
        // return the card
        return this._cardElement;
    }
}















