import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import './styles/Header.css';

function Header(props) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  function handleBurgerState() {
    setIsBurgerOpen(!isBurgerOpen);
  }

  return( props.isLogged
          ? <header className="header">
              <div className={`header__info-burger ${isBurgerOpen ? "header__info-burger_opened" : "" }`}>
              { props.email  && <p className="header__email">{props.email}</p> }
                <Link className="header__link" to={props.buttonLink} onClick={props.onSignOut}>{ props.buttonText }</Link>
              </div>
              <div className='header__container'>
                <img src={logo} alt="Логотип платформы место" className="header__logo" />
                <div className="header__info header__info_hiden">
                  <p className="header__email">{props.email}</p>
                  <Link className="header__link" to={props.buttonLink} onClick={props.onSignOut}>{ props.buttonText }</Link>
                </div>
                <button className={`header__burger-button ${isBurgerOpen ? 'header__burger-button_opened' : ''}`} onClick={handleBurgerState}/>
              </div>
          </header>

          : <header className="header">
              <div className='header__container'>
                <img src={logo} alt="Логотип платформы место" className="header__logo" />
                  <div className="header__info">
                    <Link className="header__link" to={props.buttonLink}>{ props.buttonText } </Link>
                  </div>
              </div>
            </header>
  );
}

export default Header;
