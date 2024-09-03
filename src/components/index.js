import UserInfo from "./UserInfo.js";
import PopupWithImage from "./PopupWithImage";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import "../pages/index.css";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

const profileFormElement = document.forms["edit-profile-form"];
const addCardFormElement = document.forms["add-card-form"];

const editFormValidator = new FormValidator(config, profileFormElement);
editFormValidator.enableValidation();

const addCardValidator = new FormValidator(config, addCardFormElement);
addCardValidator.enableValidation();

const cardsWrap = document.querySelector(".cards__list");
/*-------------------------------------------------------------------*/
/*                         Elements                                  */
/*-------------------------------------------------------------------*/
const profileEditButton = document.querySelector(".profile__edit-button");

const editProfileModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");

const closeButtons = document.querySelectorAll('.modal__close');

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const modalImage = previewImageModal.querySelector(".modal__image");
const imageDescription = previewImageModal.querySelector(".modal__description");

const nameInput = profileFormElement.querySelector(".modal__input_type_name");
const jobInput = profileFormElement.querySelector(".modal__input_type_description");
const cardTitleInput = addCardFormElement.querySelector(".modal__input_type_title");
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
const addNewCardButton = document.querySelector(".profile__add-button");

/*-------------------------------------------------------------------*/
/*                         Functions                                 */
/*-------------------------------------------------------------------*/
function openModal(modal) {
  modal.classList.add('modal_opened');
  document.addEventListener('mousedown', handleModalMouseDown);
  document.addEventListener('keydown', handleModalKeyDown);
}

function closeModal(modal) {
  if (modal) {
    modal.classList.remove('modal_opened');
    document.removeEventListener('mousedown', handleModalMouseDown);
    document.removeEventListener('keydown', handleModalKeyDown);
  }
}

function handleModalMouseDown(e) {
  const modalContent = e.target.closest('.modal__content');
  if (!modalContent) { 
    const openedModal = e.target.closest('.modal.modal_opened');
    closeModal(openedModal);
  }
}

function handleModalKeyDown(e) {
  if (e.key === 'Escape') {
    const openedModal = document.querySelector('.modal.modal_opened');
    closeModal(openedModal); // close the currently opened modal
  }
}

function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(cardData, wrapper) {
  const cardElement = createCard(cardData);
  wrapper.prepend(cardElement);
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfileModal);
  e.target.reset();
}  

function handleAddCardFormSubmit(e) {
  e.preventDefault();  
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);
  e.target.reset();
  addCardValidator.resetValidation();
addCardValidator.disableSubmitButton();
}

  function handleImageClick(cardData) {
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    imageDescription.textContent = cardData.name;
    openModal(previewImageModal);
}

/*-------------------------------------------------------------------*/
/*                      Event Listeners                              */
/*-------------------------------------------------------------------*/

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.modal');
  button.addEventListener('click', () => closeModal(popup));
});

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

const handleFormSubmit = (formData) => {
  console.log(formData);
};

const newCardPopup = new PopupWithForm('#add-card-modal', handleFormSubmit);
console.log(newCardPopup);
newCardPopup.setEventListeners();

const imagePopup = new PopupWithImage(imageLink, imageName);
imagePopup.setEventListeners()

const userInfo = new UserInfo({
  profileName: ".profile__title",
  jobElement: ".profile__description"
});

