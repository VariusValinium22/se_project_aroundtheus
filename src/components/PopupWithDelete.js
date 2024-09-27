import Popup from "./Popup.js";

class PopupWithDelete extends Popup {
    construtor(popupSelector) {

    }
    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            
        })
    }
}