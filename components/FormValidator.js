export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this._submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);            
    }
    
    enableValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                console.log(this._checkInputValidity(inputElement));
                this._toggleButtonState();
            });
        });
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this._toggleButtonState();
        });
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            console.log(this._submitButton);
            this._submitButton.classList.add(this._settings.inactiveButtonClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._settings.inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._settings.errorClass);
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    }

    resetValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    }
}

// when form fields are invalid : submission button remains disabled
//                                              retain current data
//  edit profile modal form AFTER submission : retain new data 
//                                              submission button disabled.
//              (currently is not disabled when reopened after submission)
//when forms submitted : clear form/submission button disabled

//when form is closed/unsubmitted: retain data

//Resetting validation [optional]
//AFTER submitting the card form, 
//          reset the validation error messages on the card modal
//          when resetting the form fields and disabling the submit button. 

//for the edit profile form
//          when opening the form since the form fields are vaild


