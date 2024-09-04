export const imageElement = imageModalWindow.querySelector(".popup__image");
export const imageCaption = imageModalWindow.querySelector(".popup__caption");

export const closeModal = (modalWindow) => {
    modalWindow.classList.remove("popup_is-opened");
    document.removeEventListener("keyup", handleEscUp);
};

export const openModal = (modalWindow) => {
    modalWindow.classList.add("popup_is-opened");
    document.addEventListener("keyup", handleEscUp);
};

export const handleEscUp = (evt) => {
    evt.preventDefault();
    IntersectionObserverEntry(evt, closeModal);
};

export const isEscEvent = (evt, action) => {
    const activePopup = document.querySelector(".popup_is-opened");
    if (evt.key === "Escape") {
        action(activePopup);
    }
};
