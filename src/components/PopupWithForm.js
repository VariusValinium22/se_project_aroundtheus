import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor( popupSelector, handleFormSubmit ) {
        super({ popupSelector });
        this._popupElement.querySelector('.modal__form');
        this._handleFormSubmit = handleFormSubmit;
    }

    close() {
        this._popupForm.reset();
        super.close();         
    }
} 

const newCardPopup = new PopupWithForm('#add-card-modal', () => {});
newCardPopup.close();
