const BASE_URL = "https://auth.nomoreparties.co";

export const register = (password, email) => {
  return fetch(BASE_URL + '/signup', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
    .then((res) => handleSubmitResponse(res));
}

export const authorize = (password, email) => {
  return fetch(BASE_URL + '/signin', {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
    .then((res) => handleSubmitResponse(res));
}

export const checkToken = (token) => {
  return fetch(BASE_URL + '/users/me', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) => handleSubmitResponse(res))
}

export const handleSubmitResponse = (res) => {
  return res.ok ?  res.json() : Promise.reject(`Ошибка: ${res.status}`);
}
