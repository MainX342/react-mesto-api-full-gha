class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(endpoint, method, body, token = null) {
    const url = `${this._baseUrl}/${endpoint}`;

    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    return fetch(url, options).then(this._checkResponse);
  }

  async getInfo(token) {
    return this._request('users/me', 'GET', null, token);
  }

  async setUserInfo(data, token) {
    return this._request('users/me', 'PATCH', {
      name: data.username,
      about: data.description,
    }, token);
  }

  async setUserAvatar(data, token) {
    return this._request('users/me/avatar', 'PATCH', {
      avatar: data.avatar,
    }, token);
  }

  async getInitialCards(token) {
    return this._request('cards', 'GET', null, token);
  }

  async addNewCardToServer(data, token) {
    return this._request('cards', 'POST', {
      name: data.name,
      link: data.link,
    }, token);
  }

  async deleteCardFromServer(cardId, token) {
    return this._request(`cards/${cardId}`, 'DELETE', null, token);
  }

  async changeLikeCardStatus(cardId, isLiked, token) {
    const method = isLiked ? 'PUT' : 'DELETE';

    return this._request(`cards/${cardId}/likes/`, method, null, token);
  }
}

// Экземпляр класса API
const api = new Api({
  baseUrl: 'mainx.backend.nomoredomainsicu.ru',
});

export default api;
