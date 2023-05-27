import {useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import api from '../utils/api.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import * as auth from '../utils/auth.js'

const App = ()  => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [access, setAccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    handleCheckToken();
  }, [navigate]);

  useEffect(() => {
    if (isLogged) {
      Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([userRes, cardsRes]) => {
        console.log(userRes)
        setCurrentUser(userRes);
        console.log(cardsRes)
        setCards(cardsRes);
      })
      .catch(err => console.log(err));
    }
  }, [isLogged])

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfileOpen(false);
    setSelectedCard(null);
    setIsDeleteCardPopupOpen(false);
    setInfoTooltipPopupOpen(false);
  }

  function handleSelectedCard(card) {
    setDeletedCard(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== card._id));

        console.log(res);

        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(name, about) {
    api.sendProfileInfo(name, about)
      .then(res => {
        setCurrentUser(res);

        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
      .then(res => {
        setCurrentUser(res);

        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlace(name, link) {
    api.sendNewCard(name, link)
      .then(newCard => {
        setCards([newCard, ...cards]);

        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleRegisterUser(password, email) {
    auth.register(password, email)
      .then((res) => {
        setAccess(true);

        navigate('/sign-in', {replace: true});
      })
      .catch(err => {
        console.log(err);

        setAccess(false);
      })
      .finally(() => setInfoTooltipPopupOpen(true));
    }

  function handleLoginUser(password, email) {
    auth.authorize(password, email)
    .then(res => navigate('/', {replace: true}))
    .catch((err) => {
      console.log(err);

      setAccess(false);

      setInfoTooltipPopupOpen(true);
    });
  }

  function handleCheckToken() {
    auth.checkToken()
      .then(res => {
          setIsLogged(true);

          setEmail(res.email);

          navigate('/', {replace: true});
        })
      .catch(err => setIsLogged(false));
  }

  function handleSignOutUser() {
    auth.signOut()
      .then(res => navigate('/sign-in', {replace: true}))
      .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="wrapper">
          <div className="page">
            <Routes>
                <Route path="/" element={
                  <ProtectedRoute  isLogged={isLogged} element={
                    <>
                      <Header buttonText="Выйти" buttonLink="/sign-in" isLogged={isLogged} email={email} onSignOut={handleSignOutUser} />
                      <Main
                        onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                        onEditProfile={() => setIsEditProfileOpen(true)}
                        onAddPlace={() => setIsAddPlacePopupOpen(true)}
                        onDeleteCardOpen={() => setIsDeleteCardPopupOpen(true)}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onSelectCard={handleSelectedCard}
                        cards={cards}
                      />
                      <Footer />
                      <EditProfilePopup isOpen={isEditProfileOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
                      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
                      <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete} card={deletedCard}/>
                      <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
                    </>
                  } />
                } />
              <Route path="/sign-up" element={
                 <>
                   <Header buttonText="Войти" buttonLink="/sign-in" isLogged={isLogged}/>
                   <Register onRegister={handleRegisterUser}/>
                 </>
               } />
               <Route path="/sign-in" element={
                 <>
                   <Header buttonText="Регистрация" buttonLink="/sign-up" isLogged={isLogged}/>
                   <Login onLogin={handleLoginUser}/>
                 </>
               } />
            </Routes>
            <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} access={access}/>
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
