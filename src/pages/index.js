import { api } from "../components/Api.js";
import {
  config,
  profileFormElement,
  addCardFormElement,
  profileEditButton,
  avatarEditButton,
  addNewCardButton,
  cardsWrap,
  nameInput,
  jobInput,
  modalImage,
  imageDescription,
  avatarFormElement,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";

const editAvatarValidator = new FormValidator(config, avatarFormElement);
editAvatarValidator.enableValidation();

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
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  ".cards__list"
);
//==========================================
//=== GET/Load the cards from the server ===
//==========================================
api
  .getInitialCards()
  .then((cards) => {
    cardList.renderItems(cards);
    console.log(
      "cards data rendered to the page:", cards.length, cards);
  })
  .catch((error) => {
    console.error("Error fetching initial cards:", error);
  });

function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

//=======================================
const newCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  const cardData = { name: formData["title"], link: formData["link"] };

  cardList.addItem(createCard(cardData));
  addCardValidator.disableSubmitButton();
});

newCardPopup.setEventListeners();

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

//=========================
//=== Get Profile Popup ===
//=========================
api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
  })
  .catch((error) => {
    console.error("info not fetched from the server", error);
  });

//===========================
//=== Edit Profile Popup ====
//===========================
const profilePopup = new PopupWithForm("#edit-profile-modal", (formData) => {
  console.log("Profile Popup:", formData)
  const name = formData["name"];
  const job = formData["description"];
  api
    .updateProfile(name, job)
    .then((updatedData) => {
      console.log('profile updated', updatedData)
      userInfo.setUserInfo({ title: updatedData.name, description: updatedData.job });
    })
    .catch((error) => {
      console.error("info not updated", error);
    });

  profilePopup.close();
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".avatar__image",
});

profilePopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  profilePopup.open();
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.title;
  jobInput.value = currentUserInfo.description;
  editFormValidator.resetValidation();

  profilePopup.open();
});

//============================
//=== Edit Avatar Popup ======
//============================
const avatarPopup = new PopupWithForm("#edit-avatar-modal", (formData) => {
  console.log("Avatar Popup", formData);
  const avatarUrl = formData.avatar;

  if (!avatarUrl) {
    console.error("URL missing");
    return;
  }
  // use api interaction
  api
    .updateAvatar(avatarUrl)
    .then((avatarData) => {
      userInfo.setUserAvatar(avatarData);
    })
    .catch((err) => {
      console.error(err);
    });
});

avatarPopup.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  avatarPopup.open();
});

//======================
//=== image Popup ======
//======================
const imagePopup = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});
imagePopup.setEventListeners();
