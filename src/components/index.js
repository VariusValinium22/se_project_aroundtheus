import { config, profileFormElement, addCardFormElement, profileEditButton, closeButtons, addNewCardButton, initialCards, cardsWrap, handleFormSubmit, nameInput, profileTitle, jobInput, profileDescription, editProfileModal, addCardModal, cardTitleInput, cardUrlInput, modalImage, imageDescription, previewImageModal} from "../utils/constants.js"
import UserInfo from "./UserInfo.js";
import PopupWithImage from "./PopupWithImage";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import "../pages/index.css";

const editFormValidator = new FormValidator(config, profileFormElement);
editFormValidator.enableValidation();
console.log(editFormValidator.textContent);

const addCardValidator = new FormValidator(config, addCardFormElement);
addCardValidator.enableValidation();

/*-------------------------------------------------------------------*/
/*                         Functions                                 */
/*-------------------------------------------------------------------*/
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("mousedown", handleModalMouseDown);
  document.addEventListener("keydown", handleModalKeyDown);
}

function closeModal(modal) {
  if (modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("mousedown", handleModalMouseDown);
    document.removeEventListener("keydown", handleModalKeyDown);
  }
}

function handleModalMouseDown(e) {
  const modalContent = e.target.closest(".modal__content");
  if (!modalContent) {
    const openedModal = e.target.closest(".modal.modal_opened");
    closeModal(openedModal);
  }
}

function handleModalKeyDown(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_opened");
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
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

const newCardPopup = new PopupWithForm("#add-card-modal", handleFormSubmit);
newCardPopup.setEventListeners();

const imagePopup = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});
imagePopup.setEventListeners();

const userInfo = new UserInfo({
  profileName: ".profile__title",
  jobElement: ".profile__description",
});

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  ".cards__list"
);
