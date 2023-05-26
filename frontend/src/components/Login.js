import { useState } from 'react';

function Login(props) {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
});

  function handleChange(e) {
    const {name, value} = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onLogin(userInfo.password, userInfo.email)

    setUserInfo({
      email: '',
       password: ''
    });
  }

  return(
    <form className="user-form" onSubmit={handleSubmit}>
      <legend className="user-form__title">Вход</legend>
      <input  onChange={handleChange} className="user-form__input" value={userInfo.email} name="email" type="email" placeholder="Email" id="inputEmail" required minLength="2" maxLength="30" />
      <input  onChange={handleChange} className="user-form__input" value={userInfo.password} name="password" type="password" placeholder="Пароль" id="inputPassword" required minLength="2" maxLength="30" />
      <button className="user-form__save-button" type="submit">Войти</button>
    </form>
  )
}

export default Login;
