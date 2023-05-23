class Api {
  constructor(link, token) {
    this._link = link;
    this._token = token;
  }

  getProfileInfo() {
    return fetch(this._link + 'users/me', {
      headers: {
      authorization: this._token
    }
  })
    .then(res => this._handleSubmitResponse(res));
  }

  sendProfileInfo(name, about) {
    return fetch(this._link + 'users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify ({
        name: `${name}`,
        about: `${about}`
      })
    })
      .then(res => this._handleSubmitResponse(res));
  }

  getInitialCards() {
    return fetch(this._link + 'cards', {
      headers: {
      authorization: this._token
    }
  })
    .then(res => this._handleSubmitResponse(res));
  }

  sendNewCard(name, link) {
    return fetch(this._link + 'cards', {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    })
      .then(res => this._handleSubmitResponse(res));
  }

  deleteCard = (cardId) => {
    return fetch(this._link + `cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._handleSubmitResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(this._link + `cards/${cardId}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._handleSubmitResponse(res));
  }

  changeAvatar(avatar) {
    return fetch(this._link + `users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `${avatar}`
      })
    })
      .then(res => this._handleSubmitResponse(res));
  }

  _handleSubmitResponse(res) {
   return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-59/', '18140f85-55a6-4a9a-9472-01d6174a6166');

export default api;


