import {
  profileDescription,
  profileImage,
  profileTitle,
} from "../utils/constants";

export default class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
      .then((res) => res.json())
      .then((result) => {
        alert("Success getting the user info!");
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
        alert("Ok, we are done with gathering userInfo!");
      });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        alert("Success getting the Initial Cards!");
        return result;
      })
      .then((cardInfo) => {})
      .catch((err) => {
        alert("Unexpected Error, please try again!", err);
      }) 
      .finally(() => {
        alert("Ok, we are done with gathering InitialCards!");
      });
  }

/*   updateProfile(name, about) {
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
  } */
}

// Initialize the Api class
const api = new Api("https://around-api.en.tripleten-services.com/v1", {
  authorization: "25fa860b-0207-4525-82fb-69fc255d22d5",
});

export { api };

api.getUserInfo();
