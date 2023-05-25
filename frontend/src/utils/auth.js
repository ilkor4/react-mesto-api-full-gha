const BASE_URL = "https://api.ilkor.students.nomoredomains.monster";

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
    credentials: 'include',
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

export const checkToken = () => {
  return fetch(BASE_URL + '/users/me', {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((res) => handleSubmitResponse(res))
}

export const handleSubmitResponse = (res) => {
  return res.ok ?  res.json() : Promise.reject(`Ошибка: ${res.status}`);
}
