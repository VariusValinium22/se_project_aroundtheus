import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor( popupSelector, handleFormSubmit ) {
        super({ popupSelector });
        this._popupElement.querySelector('.modal__form');
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        const inputList = this.popupForm.querySelectorAll('.modal__input');
        const formValues = {};

        inputList.forEach((input) => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
        this._handleFormSumbit(this._getInputValues());
        });
    }

    close() {
        this._popupForm.reset();
        super.close();         
    }
}

export default PopupWithForm;


