import Header from "./Header/Header.js";
import Main from "./Main/Main.js";
import Footer from "./Footer/Footer.js";
import PopupWithForm from "./PopupWithForm/PopupWithForm.js";
import ImagePopup from "./ImagePopup/ImagePopup.js";
import { useState, useEffect, useCallback } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.js";
import { Navigate, useNavigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.js";
import ProtectedPages from "./ProtectedPages/ProtectedPages.js";
import { getUserData, authorization, registration } from "../utils/auth.js";
import SendContext from "../contexts/SendContext.js";
import InfoTooltip from "./InfoTooltip/InfoTooltip.js";

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [dataUser, setDataUser] = useState("");

  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cardIdForDelete, setCardIdForDelete] = useState("");

  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.jwt) {
      getUserData(localStorage.jwt)
        .then((res) => {
          setDataUser(res.email);
          setLoggedIn(true);
          navigate("/");
        }
        )
        .catch((error) => {
          console.log(`Ошибка авторизации при повторном входе ${error}`);
        });
    }
  }, [navigate]);

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      Promise.all([api.getInfo(localStorage.jwt), api.getInitialCards(localStorage.jwt)])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((error) => {
          console.error(`Ошибка при создании начальных данных ${error}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loggedIn]);

  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsPopupOpen(false);
    setIsSuccessful(false);
    setIsError(false);
  }, []);

  const handleEscKey = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    },
    [closeAllPopups]
  );

  useEffect(() => {
    if (isPopupOpen || isSuccessful || isError) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isPopupOpen, isSuccessful, isError, handleEscKey]);

  function handleEditProfileClick() {
    setIsPopupOpen(true);
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsPopupOpen(true);
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsPopupOpen(true);
    setIsEditAvatarPopupOpen(true);
  }

  function handleImageClick(card) {
    setIsPopupOpen(true);
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleDeleteCardClick(cardId) {
    setCardIdForDelete(cardId);
    setIsPopupOpen(true);
    setIsDeleteCardPopupOpen(true);
  }

  const handleSubmit = useCallback(
    (request, textError) => {
      setIsSending(true);
      request()
        .then(closeAllPopups)
        .catch((err) => console.error(`${textError} ${err}`))
        .finally(() => setIsSending(false));
    },
    [closeAllPopups]
  );

  const handleSubmitForDeleteCard = useCallback(
    (evt) => {
      evt.preventDefault();
      async function makeRequest() {
        await api.deleteCardFromServer(cardIdForDelete, localStorage.jwt);
        setCards((state) =>
          state.filter((item) => item._id !== cardIdForDelete)
        );
      }
      handleSubmit(makeRequest, "Ошибка удаления карточки");
    },
    [cardIdForDelete, handleSubmit]
  );

  const handleUpdateUser = useCallback(
    (user) => {
      async function makeRequest() {
        const res = await api.setUserInfo(user, localStorage.jwt);
        setCurrentUser(res);
      }
      handleSubmit(makeRequest, "Ошибка редактирования профиля");
    },
    [handleSubmit]
  );

  const handleUpdateAvatar = useCallback(
    (user) => {
      async function makeRequest() {
        const res = await api.setUserAvatar(user, localStorage.jwt);
        setCurrentUser(res);
      }
      handleSubmit(makeRequest, "Ошибка редактирования аватара");
    },
    [handleSubmit]
  );

  const handleAddPlaceSubmit = useCallback(
    (card) => {
      async function makeRequest() {
        const res = await api.addNewCardToServer(card, localStorage.jwt);
        setCards([res, ...cards]);
      }
      handleSubmit(makeRequest, "Ошибка добавления карточки");
    },
    [cards, handleSubmit]
  );

  const handleCardLike = useCallback(
    (card) => {
      const isLiked = card.likes.some((i) => i === currentUser._id);
      api
        .changeLikeCardStatus(card._id, !isLiked, localStorage.jwt)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          console.error(`Ошибка при изменении статуса лайка ${error}`);
        });
    },
    [currentUser._id]
  );

  function handleLogin(password, email) {
    setIsSending(true);
    authorization(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        window.scrollTo(0, 0);
        navigate("/");
      })
      .catch((error) => {
        setIsError(true);
        console.error(`Ошибка при авторизации ${error}`);
      })
      .finally(() => setIsSending(false));
  }

  function handleRegister(password, email) {
    setIsSending(true);
    registration(password, email)
      .then((res) => {
        setIsSuccessful(true);
        window.scrollTo(0, 0);
        navigate("/sign-in");
      })
      .catch((error) => {
        setIsError(true);
        console.error(`Ошибка при регистрации ${error}`);
      })
      .finally(() => setIsSending(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <SendContext.Provider value={isSending}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={ProtectedPages}
                  dataUser={dataUser}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleImageClick}
                  onDeleteCard={handleDeleteCardClick}
                  onCardLike={handleCardLike}
                  cards={cards}
                  isLoading={isLoading}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <>
                  <Header name="signup" />
                  <Main name="signup" handleRegister={handleRegister} />
                </>
              }
            />
            <Route
              path="/sign-in"
              element={
                <>
                  <Header name="signin" />
                  <Main name="signin" handleLogin={handleLogin} />
                </>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </SendContext.Provider>

        <SendContext.Provider value={isSending}>
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            isSending={isSending}
          />
          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            isSending={isSending}
          />
          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            isSending={isSending}
          />
          <PopupWithForm
            name="delete-card"
            title="Вы уверены?"
            titleButton="Да"
            sendingText="Удаление..."
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleSubmitForDeleteCard}
            isSending={isSending}
          />
        </SendContext.Provider>

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          name="successful"
          titleText={"Вы успешно зарегистрировались!"}
          isOpen={isSuccessful}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          name="error"
          titleText={"Что-то пошло не так! Попробуйте ещё раз."}
          isOpen={isError}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
