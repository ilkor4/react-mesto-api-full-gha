class Api {
  constructor(link) {
    this._link = link;
  }

  getProfileInfo() {
    return fetch(this._link + '/users/me', {
      credentials: 'include',
  })
    .then(res => this._handleSubmitResponse(res));
  }

  sendProfileInfo(name, about) {
    return fetch(this._link + '/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
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
    return fetch(this._link + '/cards', {
      credentials: 'include',
  })
    .then(res => this._handleSubmitResponse(res));
  }

  sendNewCard(name, link) {
    return fetch(this._link + '/cards', {
      method: 'POST',
      credentials: 'include',
      headers: {
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
    return fetch(this._link + `/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(res => this._handleSubmitResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(this._link + `/cards/${cardId}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      credentials: 'include',
    })
    .then(res => this._handleSubmitResponse(res));
  }

  changeAvatar(avatar) {
    return fetch(this._link + `/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
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

const api = new Api('http://localhost:3000');

export default api;


