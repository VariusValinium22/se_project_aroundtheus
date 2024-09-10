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
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";

const editFormValidator = new FormValidator(config, profileFormElement);
editFormValidator.enableValidation();

const addCardValidator = new FormValidator(config, addCardFormElement);
addCardValidator.enableValidation();

/*-------------------------------------------------------------------*/
/*                         Functions                                 */
/*-------------------------------------------------------------------*/

function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.getView();
}

const cardList = new Section(
  {
    data: initialCards,
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  ".cards__list"
);

cardList.renderItems();

function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

/*-------------------------------------------------------------------*/
/*               Instantiations/EventListeners                       */
/*-------------------------------------------------------------------*/

const newCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  const cardData = { name: formData["title"], link: formData["link"] };

  cardList.addItem(createCard(cardData));
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
    editFormValidator.resetValidation();
  
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




