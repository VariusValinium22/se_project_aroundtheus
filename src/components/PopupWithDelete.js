import Popup from "./Popup.js";

class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._buttonText = this._submitButton.textContent;
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setButtonText(isLoading, loadingText = "Deleting...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._buttonText;
    }
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }
}

export default PopupWithDelete;
