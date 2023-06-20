import { Routes, Route, Link } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header({ email, onSignOut}) {


  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Векторный логотип"/>
      <div className="header__links">
        <Routes>
          <Route path="/sign-in"
            element={
              <Link to='/sign-up' className="header__link">Регистрация</Link>
            } />
          <Route path="/sign-up"
            element={
              <Link to='/sign-in' className="header__link">Войти</Link>
            } />
          <Route path="/" 
            element={
              <>
                <p className="header__email">{email}</p>
                <button type="button" onClick={onSignOut} className="header__button-exit header__link" name="exitButton">Выйти</button>
              </>
            }/>
        </Routes>
      </div>
    </header>
  );
}

export default Header;