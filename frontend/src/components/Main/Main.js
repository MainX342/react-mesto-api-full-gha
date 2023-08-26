import { useContext, memo } from "react";
import Card from "../Card/Card.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import PageLoader from "../PageLoader/PageLoader.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";

const Main = memo(
  ({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onDeleteCard,
    onCardLike,
    cards,
    isLoading,
    name,
    handleLogin,
    handleRegister,
  }) => {
    const currentUser = useContext(CurrentUserContext);

    return (
      <main className="content page__content">
        {name === "main" ? (
          <>
            <section className="profile">
              <button
                type="button"
                className="profile__avatar-edit"
                onClick={onEditAvatar}
              >
                <img
                  src={currentUser.avatar ? currentUser.avatar : "#"}
                  alt="Аватар пользователя"
                  className="profile__avatar"
                />
              </button>
              <div className="profile__info">
                <h1 className="profile__info-name">
                  {currentUser.name ? currentUser.name : ""}
                </h1>
                <button
                  type="button"
                  className="profile__info-edit"
                  onClick={onEditProfile}
                />
                <p className="profile__info-description">
                  {currentUser.about ? currentUser.about : ""}
                </p>
              </div>
              <button
                type="button"
                className="profile__add-btn"
                onClick={onAddPlace}
              />
            </section>
            <section className="elements" aria-label="Фотографии">
              <ul className="elements__list">
                {isLoading ? (
                  <PageLoader />
                ) : (
                  cards.map((data) => {
                    return (
                      <Card
                        key={data._id}
                        card={data}
                        onCardClick={onCardClick}
                        onDeleteCard={onDeleteCard}
                        onCardLike={onCardLike}
                      ></Card>
                    );
                  })
                )}
              </ul>
            </section>
          </>
        ) : name === "signup" ? (
          <Register name={name} handleRegister={handleRegister} />
        ) : (
          <Login name={name} handleLogin={handleLogin} />
        )}
      </main>
    );
  }
);

export default Main;
