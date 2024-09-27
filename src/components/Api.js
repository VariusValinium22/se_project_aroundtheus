export default class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  // post request to add card on the server through createCard()
  addNewCard(cardData) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    })
    .then(response => response.json())
    .then(this._handleRequests);
  }

  // GET-LOAD the user's info and img from the server
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(this._handleRequest);
  }

  //GET-LOAD the initial card from the server
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(this._handleRequest);
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
    }).then(this._handleRequest);
  }

  //PATCH-EDIT the avatar in profile (UPDATE)
  updateAvatar(avatarUrl) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then(this._handleRequest);
  }

  //DELETE the card
/*   deleteCard(cardId) {
    return fetch(`${this.baseUrl}cards/${cardId}`, {
      headers: this.headers,
    }).then(this._handleRequest);
  } */

  _handleRequest(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }
}

// Initialize the Api class
const api = new Api("https://around-api.en.tripleten-services.com/v1", {
  authorization: "25fa860b-0207-4525-82fb-69fc255d22d5",
});

export { api };

api.getUserInfo();
