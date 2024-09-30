import { api } from "../components/Api.js";
import {
  config,
  profileFormElement,
  addCardFormElement,
  profileTitle,
  profileDescription,
  profileEditButton,
  avatarEditButton,
  addNewCardButton,
  nameInput,
  jobInput,
  avatarFormElement,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
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
  const card = new Card(
    item,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
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
    console.log("Fetched Cards Data: ", cards);
    cardList.renderItems(cards);
  })
  .catch((error) => {
    console.error("Error fetching initial cards:", error);
  });

function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

//================================================================
//=== POST a newCard on to the server using CreateCard() above ===
//================================================================
const newCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  const cardData = { name: formData["title"], link: formData["link"] };
  newCardPopup.setButtonText(true);
  api
    .addNewCard(cardData)
    .then((createdCard) => {
      cardList.addItem(createCard(createdCard));
      newCardPopup.close();
    })
    .catch((error) => {
      console.error("Error adding new card: ", error);
    })
    .finally(() => newCardPopup.setButtonText());
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
  const name = formData["name"];
  const job = formData["description"];
  profilePopup.setButtonText(true);
  api
    .updateProfile(name, job)
    .then((updatedData) => {
      userInfo.setUserInfo({
        name: updatedData.name,
        about: updatedData.about,
      });
      profilePopup.close();
    })
    .catch((error) => {
      console.error("info not updated", error);
    })
    .finally(() => {
      profilePopup.setButtonText();
    });
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
  const avatarUrl = formData.avatar;

  if (!avatarUrl) {
    console.error("URL missing");
    return;
  }
  avatarPopup.setButtonText(true);
  api
    .updateAvatar(avatarUrl)
    .then((avatarData) => {
      userInfo.setUserAvatar(avatarData);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarPopup.setButtonText();
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

//=========================
//=== delete card Popup ===
//=========================
const deleteCardPopup = new PopupWithDelete({
  popupSelector: "#delete-card-modal",
});

deleteCardPopup.setEventListeners();

function handleDeleteClick(card) {
  deleteCardPopup.open();

  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.setButtonText(true);
    api
      .deleteCard(card._id)
      .then(() => {
        card.handleDeleteCard();
        deleteCardPopup.close();
      })
      .catch((error) => {
        console.error("Error deleting card: ", error);
      })
      .finally(() => {
        deleteCardPopup.setButtonText();
      });
  });
}

//==================================
//=== removeLike/addLike to card ===
//==================================
function handleLikeClick(card) {
  // if card isLiked removeLike
  if (card._isLiked) {
    api
      .removeLike(card._id)
      .then(() => {
        card._handleLikeIcon();
      })
      .catch((error) => {
        console.log("Error removing like: ", error);
      });
    // else addLike to card
  } else {
    api
      .addLike(card._id)
      .then(() => {
        card._handleLikeIcon();
      })
      .catch((error) => {
        console.error("Error adding like: ", error);
      });
  }
}
