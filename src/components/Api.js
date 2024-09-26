import {
  profileDescription,
  avatarImage,
  profileTitle,
  profileFormElement,
  avatarFormElement,
} from "../utils/constants";

export default class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // GET-LOAD the user's info and img from the server
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
      .then(this._handleRequest)
      .then((result) => {
        return result;
      })
  }
  _handleRequest(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  //GET-LOAD the initial card from the server
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("fetched initial cards", result);
        return result;
      })
  }

  //PATCH-EDIT the profile information (UPDATE)
  updateProfile(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(`Error: ${response.status}`);
      }
      return response.json();
     }); 
/*       .then((response) => response.json())
      .then((updatedData) => {
        profileTitle.textContent = updatedData.name;
        profileDescription.textContent = updatedData.about;
      }); */
  }

  //update(PATCH) the avatar in profile
  updateAvatar(avatarUrl) {
    console.log(avatarUrl)
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: { 
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    })
    .then((response) => {
      if (!response.ok) { // not 200/300
        return Promise.reject(`Error: ${response.status}`);
      }
      return response.json(); // is 200/300
    })
  }
}

// Initialize the Api class
const api = new Api("https://around-api.en.tripleten-services.com/v1", {
  authorization: "25fa860b-0207-4525-82fb-69fc255d22d5",
});

export { api };

api.getUserInfo();

/* profileFormElement.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = event.target.name.value;
  const description = event.target.description.value;


  .then((profileData) => {
      document.querySelector("#profile-name-input").textContent =
        profileData.name;
      document.querySelector("#profile-description-input").textContent =
        profileData.about;
    })
    .catch((err) => {
      console.error(err);
    });
}); */