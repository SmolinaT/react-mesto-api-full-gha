class Api {
  constructor({address, headers}) {
    this._address = address;
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
    const token = localStorage.getItem('jwt');
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(this._handleReturnPromise)
  }

  //Получить список всех карточек в виде массива
  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._address}/cards`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._handleReturnPromise)
  }

  //Редактировать данные пользователя
  editUserData(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._handleReturnPromise)
  }

  //Добавить карточку
  addNewCard(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._handleReturnPromise)
  }

  //Удалить карточку
  deleteCard(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._address}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(this._handleReturnPromise)
  }

  //поставить и удалить лайк
  changeLikeCardStatus(id, isLiked) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(this._handleReturnPromise)
  }

  //Заменить аватар
  editAvatar(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._handleReturnPromise)
  }
}

export const api = new Api({
  //address: "http://localhost:3000",
  address: "https://api.smolina.nomoreparties.sbs"
});