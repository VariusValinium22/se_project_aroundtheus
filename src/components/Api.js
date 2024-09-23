import {
  profileDescription,
  profileImage,
  profileTitle,
  profileFormElement,
} from "../utils/constants";

export default class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _handleRequest(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  // fetch(GET) the user's info and img
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
      .then(this._handleRequest)
      .then((result) => {
        console.log("Success getting the user info!");
        return result;
      })
      .then((userInfo) => {
        profileTitle.textContent = userInfo.name;
        profileDescription.textContent = userInfo.about;
        profileImage.src = userInfo.avatar;
      })
      .catch((err) => {
        console.error("Error fetching the user's info:", err);
      })
      .finally(() => {
        console.log("Ok, we are done with gathering userInfo!");
      });
  }

  //fetch(GET) the initial card
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        console.log("Success getting the Initial Cards!");
        return result;
      })
      .catch((err) => {
        console.error("Unexpected Error, please try again!");
      })
      .finally(() => {
        console.log("Ok, we are done with gathering InitialCards!");
      });
  }

  //update(PATCH) the profile information
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
      .then((res) => res.json())
      .then((updatedData) => {
        profileTitle.textContent = updatedData.name;
        profileDescription.textContent = updatedData.about;
      })
      .catch((err) => {
        console.error("Error updating the profile:", err);
      });
  }
  
  //update(PATCH) the profile image
  updateAvatar(avatarUrl) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
    .then (response => {
      if (!response.ok) {
        return Promise.reject(`Error: ${response.status}`);
      }
      return response.json();
    });
  }
}

// Initialize the Api class
const api = new Api("https://around-api.en.tripleten-services.com/v1", {
  authorization: "25fa860b-0207-4525-82fb-69fc255d22d5",
});

export { api };

api.getUserInfo();

profileFormElement.addEventListener('submit', function(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const description = event.target.description;
  const avatarUrl = event.target.avatar.value;

  Promise.all([
    api.updateProfile(name, description),
    api.updateAvatar(avatarUrl)
  ])
  .then(([profileData, avatarData]) => {
    document.querySelector('#profile-name-input').textContent = profileData.name;
    document.querySelector('#profile-description-input').textContent = profileData.about;
    document.querySelector('#profile-avatar-input').src = avatarData.avatar;
  })
  .catch(err => {
    console.error(err);
  });
});

