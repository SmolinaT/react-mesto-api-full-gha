class Api {
  constructor({address, headers}) {
    this._address = address;
    this._headers = headers;
    this._handleReturnPromise = this._handleReturnPromise.bind(this);
  }

  _handleReturnPromise(res) {
    if (res.ok) {
      return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Получить данные пользователя
  getUserData() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._handleReturnPromise)
  }

  //Получить список всех карточек в виде массива
  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._handleReturnPromise)
  }

  //Редактировать данные пользователя
  editUserData(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._handleReturnPromise)
  }

  //Добавить карточку
  addNewCard(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._handleReturnPromise)
  }

  //Удалить карточку
  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleReturnPromise)
  }

  //поставить и удалить лайк
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers
    })
    .then(this._handleReturnPromise)
  }

  //Заменить аватар
  editAvatar(data) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._handleReturnPromise)
  }
}

export const api = new Api({
  address: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    authorization: "0164aac4-3c8a-4bb3-9f33-aaf495de1575",
    'Content-Type': 'application/json'
  }
});