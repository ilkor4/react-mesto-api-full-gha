import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Register.css'

function Register(props) {
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

      props.onRegister(userInfo.password, userInfo.email);

      setUserInfo({
        email: '',
        password: ''
      });
  }

  return(
      <form className="user-form" onSubmit={handleSubmit}>
        <legend className="user-form__title">Регистрация</legend>
        <input  onChange={handleChange} className="user-form__input" value={userInfo.email} name="email" type="email" placeholder="Email" id="inputEmail" required minLength="2" maxLength="30" />
        <input  onChange={handleChange} className="user-form__input" value={userInfo.password} name="password" type="password" placeholder="Пароль" id="inputPassword" required minLength="2" maxLength="30" />
        <button className="user-form__save-button" type="submit">Зарегистрироваться</button>
        <p className="user-form__caption">Уже зарегистрированы? <Link to="#" className='form__link'>Войти</Link></p>
      </form>
  )
}

export default Register;
