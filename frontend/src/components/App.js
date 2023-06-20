import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup.js';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import { auth } from '../utils/auth';
import ProtectedRouteElement from './ProtectedRoute';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isCardDelete, setIsCardDelete] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopup] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCardDelete, setSelectedCardDelete] = React.useState({});
  const [profileEmail, setProfileEmail] = React.useState('')

  const [isUserSending, setIsUserSending] = React.useState(false);
  const [isCardSending, setIsCardSending] = React.useState(false);
  const [isSignIn, setIsSignIn] = React.useState(true);
  const [loggIn, setLoggIn] = React.useState(false);
  
  const navigate = useNavigate();

  React.useEffect(() => {
    if(loggIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([me, cards]) => {
        setCurrentUser(me);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltipPopup(false);
      });
    }
  }, [loggIn])

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          if (res.data) {
            setLoggIn(true);
            setProfileEmail(res.data.email);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          openInfoTooltipPopup(false);
        });
    }
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(item) {
    setSelectedCard(item);
  }

  function handleDeleteButtonClick (card) {
    setIsCardDelete(!isCardDelete);
    setSelectedCardDelete(card);
  }

  function openInfoTooltipPopup(isSignIn) {
    setIsInfoTooltipPopup(true);
    setIsSignIn(isSignIn);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsCardDelete(false);
    setIsInfoTooltipPopup(false);
    setSelectedCard({});
    setSelectedCardDelete({});
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
      openInfoTooltipPopup(false);
    });
  }

  function handleCardDelete(card) {
    setIsCardSending(true);
    const isOwn = card.owner._id === currentUser._id;

    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter(c => c._id !== card._id));
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
      openInfoTooltipPopup(false);
    })
    .finally(() => setIsCardSending(false));
  }

  function handleUpdateUser(data) {
    setIsUserSending(true);
    api.editUserData(data)
      .then((dataInfo) => {
        setCurrentUser(dataInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltipPopup(false);
      })
      .finally(() => setIsUserSending(false));
  }

  function handleUpdateAvatar(data) {
    setIsUserSending(true);
    api.editAvatar(data)
      .then((dataAvatar) => {
        setCurrentUser(dataAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltipPopup(false);
      })
      .finally(() => setIsUserSending(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsCardSending(true);
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltipPopup(false);
      })
      .finally(() => setIsCardSending(false));
  }

  function handleLogin({password, email}) {
    auth.takeLogin(password, email)
    .then((res) => {
      if (res.token) {
        setProfileEmail(email);
        localStorage.setItem("jwt", res.token);
        setLoggIn(true);
        navigate('/')
      }
    })
    .catch((err) => {
      console.log(err);
      openInfoTooltipPopup(false)
    })
  }

  function handleRegister({password, email}) {
    auth.takeRegister(password, email)
    .then((data) => {
      if (data) {
        openInfoTooltipPopup(true);
        navigate('/sign-in')
      }
    })
    .catch((err) => {
      console.log(err);
      openInfoTooltipPopup(false)
    })
  }

  function handleLogOut() {
    setLoggIn(false);
    setProfileEmail('')
    localStorage.removeItem("jwt");
    navigate('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className='page'>
          <Header loggIn={loggIn}
            email={profileEmail}
            onSignOut={handleLogOut} />
          <Routes>
            <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<ProtectedRouteElement element={Main}
              loggIn={loggIn}
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick} 
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteButtonClick}
              cards={cards}/>} />
          </Routes>
          <Footer loggIn={loggIn}/>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser}
            isSending={isUserSending} /> 
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar}
            isSending={isUserSending}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups} 
            onAddPlace={handleAddPlaceSubmit}
            isSending={isCardSending}/>
          <DeletePlacePopup card={selectedCardDelete} 
            onDeleteCard={handleCardDelete} 
            isOpen={isCardDelete} 
            onClose={closeAllPopups} 
            isSending={isCardSending}/>
          <InfoTooltip isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isSignIn={isSignIn}/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
