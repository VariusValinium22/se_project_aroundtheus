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

/* const cardTemplate = document.querySelector("#card-template").content.firstElementChild; */
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardsWrap = document.querySelector(".cards__list");

/*-------------------------------------------------------------------*/
/*                         Elements                                  */
/*-------------------------------------------------------------------*/
//Instantiate the edit button to open the modal
const profileEditButton = document.querySelector(".profile__edit-button");
//instantiate the FULL modal for profile and card
const editProfileModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
//use the above variable to instantiate the modal__form
const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
// use the FULL model to find modal__close button
const profileModalCloseButton = editProfileModal.querySelector(".modal__close");
const addModalCloseButton = addCardModal.querySelector(".modal__close");

//profile data
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//   card data input for a form
const nameInput = profileFormElement.querySelector(".modal__input_type_name");
const jobInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);
const cardTitleInput = addCardFormElement.querySelector(".modal__input_type_title");
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

// button to create a new card
const addNewCardButton = document.querySelector(".profile__add-button");

// cards data for a list
const cardListEl = document.querySelector(".cards__list");

/*-------------------------------------------------------------------*/
/*                         Functions                                 */
/*-------------------------------------------------------------------*/
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

/* function openModal() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  editProfileModal.classList.add("modal_opened");
} */

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfileModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const cardElement = getCardElement();
  closeModal(addCardModal);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

/*-------------------------------------------------------------------*/
/*                      Event Listeners                              */
/*-------------------------------------------------------------------*/

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});
profileModalCloseButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);
// add new card
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addModalCloseButton.addEventListener("click", () => closeModal(addCardModal));

initialCards.forEach((cardData) => {
  cardsWrap.prepend(getCardElement(cardData));
});
