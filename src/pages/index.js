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
import avatarInfo from "../components/AvatarInfo.js";
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

api.getInitialCards()
  .then((cards) => {
    console.log(cards)
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.error("Error fetching initial cards:", err);
  });
  

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


//======================
//=== Edit Profile =====
//======================
const profilePopup = new PopupWithForm("#edit-profile-modal", (formData) => {
  const name = formData["name"];
  const job = formData["description"];
  // use api interaction
  userInfo.setUserInfo({ title: name, description: job });
  profilePopup.close();
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".avatar__image"
})

profilePopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
    profilePopup.open();
    const currentUserInfo = userInfo.getUserInfo();
    nameInput.value = currentUserInfo.title;
    jobInput.value = currentUserInfo.description;
    editFormValidator.resetValidation();
  
  profilePopup.open();
});

//=======================
//=== Avatar Popup ======
//=======================
const avatarPopup = new PopupWithForm("#edit-avatar-modal", (formData) => {
  console.log(formData)
  api.updateAvatar();
  userInfo.setUserAvatar(formData);
})

avatarPopup.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  avatarPopup.open();
  
})

//======================
//=== image Popup ======
//======================
const imagePopup = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});
imagePopup.setEventListeners();


