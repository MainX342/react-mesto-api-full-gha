import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useCallback, useState, useEffect } from "react";

function Header({ name, dataUser }) {
  const [burger, setBurger] = useState(false);

  const closeBurgerOnWidth = useCallback(() => {
    if (document.documentElement.clientWidth > "680") {
      setBurger(false);
    }
  }, []);

  useEffect(() => {
    if (!burger) return;
    window.addEventListener("resize", closeBurgerOnWidth);

    return () => {
      window.removeEventListener("resize", closeBurgerOnWidth);
    };
  }, [burger, closeBurgerOnWidth]);

  function handelClick() {
    if (!burger) {
      setBurger(true);
    } else {
      setBurger(false);
    }
  }

  function onSignOut() {
    setBurger(false);
    localStorage.removeItem("jwt");
  }

  return (
    <header
      className={`header page__header${burger ? " page__header_opened" : ""}`}
    >
      <img src={logo} alt="Логотип" className="header__logo" />
      {name === "signup" || name === "signin" ? (
        <Link
          to={name === "signup" ? "/sign-in" : "/sign-up"}
          className="header__link"
        >
          {name === "signup" ? "Войти" : "Регистрация"}
        </Link>
      ) : (
        <>
          <div
            className={`header__email-container ${
              burger ? "header__email-container_opened" : ""
            }`}
          >
            <p className="header__email">{dataUser}</p>
            <Link
              to={`/sign-in`}
              className="header__unlogin"
              onClick={onSignOut}
            >
              Выйти
            </Link>
          </div>
          <button
            className={`header__button ${
              burger ? "header__button_active" : ""
            }`}
            onClick={handelClick}
          ></button>
        </>
      )}
    </header>
  );
}

export default Header;
