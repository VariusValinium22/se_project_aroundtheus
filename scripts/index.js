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

  // cards data for a list
const cardsWrap = document.querySelector(".cards__list");

/*-------------------------------------------------------------------*/
/*                         Elements                                  */
/*-------------------------------------------------------------------*/
//Instantiate the edit button to open the modal
const profileEditButton = document.querySelector(".profile__edit-button");
//instantiate the FULL modal for profile and card
const editProfileModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");
//use the above variable to instantiate the modal__form
const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");

// use the FULL model to find modal__close button
const profileModalCloseButton = editProfileModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const previewImageModalCloseButton = previewImageModal.querySelector(".modal__close");

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




/*-------------------------------------------------------------------*/
/*                         Functions                                 */
/*-------------------------------------------------------------------*/
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
};

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfileModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  
  
  //use cardImage. Add click event listener to the ccardImage 
    //openModel() with previewImageModal. Add previewImageModal to HTML.
    //go to the opened image source and change it to the cardImage source.
    //...we've done this multiple times.
  
    //next task: smooth in effect. Read the article.  14:30 
  
    cardImage.addEventListener("click", () => {
      openModal(previewImageModal);
      const modalImage = previewImageModal.querySelector("#card__image");
      const imageDescription = previewImageModal.querySelector("#image-description");
      modalImage.src = data.link;
      modalImage.alt = data.name;
      imageDescription.textContent = modalImage.alt;
    });

    // add event listener
  // add cardElement.remove();
  deleteButton.addEventListener("click", () => {
    deleteButton.classList.toggle('card__delete-button_active');
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle('card__like-button_active');
  });
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}



/*-------------------------------------------------------------------*/
/*                      Event Listeners                              */
/*-------------------------------------------------------------------*/

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

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
addCardModalCloseButton.addEventListener("click", () => closeModal(addCardModal));
previewImageModalCloseButton.addEventListener("click", () => closeModal(previewImageModal));

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));


