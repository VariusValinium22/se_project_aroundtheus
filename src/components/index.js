import {
  config,
  profileFormElement,
  addCardFormElement,
  profileEditButton,
  addNewCardButton,
  initialCards,
  cardsWrap,
  nameInput,
  jobInput,
  modalImage,
  imageDescription,
} from "../utils/constants.js";
import UserInfo from "./UserInfo.js";
import PopupWithImage from "./PopupWithImage.js";
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

function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(cardData, wrapper) {
  const cardElement = createCard(cardData);
  wrapper.prepend(cardElement);
}

function handleImageClick(cardData) {
  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;
  imageDescription.textContent = cardData.name;
  imagePopup.open(cardData);
}

/*-------------------------------------------------------------------*/
/*               Instantiations/EventListeners                       */
/*-------------------------------------------------------------------*/

const newCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  const name = formData["title"];
  const link = formData["link"];

  renderCard({ name, link }, cardsWrap);
  addCardValidator.resetValidation();
  addCardValidator.disableSubmitButton();
});
newCardPopup.setEventListeners();

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

const profilePopup = new PopupWithForm("#edit-modal", (formData) => {
  const name = formData["name"];
  const job = formData["description"];

  userInfo.setUserInfo({ title: name, description: job });
  profilePopup.close();
});

profilePopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.title;
  jobInput.value = currentUserInfo.description;
  profilePopup.open();
});

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
initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
