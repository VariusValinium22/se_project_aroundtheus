export const cardsWrap = document.querySelector(".cards__list");
/*-------------------------------------------------------------------*/
/*                         Elements                                  */
/*-------------------------------------------------------------------*/
export const editProfileModal = document.querySelector("#edit-profile-modal");
export const deleteCardModal = document.querySelector("#delete-card-modal");
export const previewImageModal = document.querySelector("#preview-image-modal");

export const profileFormElement = document.querySelector("#edit-profile-form");
export const addCardFormElement = document.querySelector("#add-card-modal");
export const avatarFormElement = document.querySelector("#edit-avatar-modal");

export const closeButtons = document.querySelectorAll(".modal__close");

export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const avatarImage = document.querySelector(".avatar__image");
export const modalImage = previewImageModal.querySelector(".modal__image");
export const imageDescription = previewImageModal.querySelector(
  ".modal__description"
);

export const nameInput = profileFormElement.querySelector(
  ".modal__input_type_name"
);
export const jobInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const avatarEditButton = document.querySelector(".avatar__edit-button");

export const addNewCardButton = document.querySelector(".profile__add-button");
export const cardDeleteButton = document.querySelector(".card__delete-button");

export const handleFormSubmit = (formData) => {
  console.log(formData);
};

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
