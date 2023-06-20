import React from "react";
import { Link } from "react-router-dom";

function Register ({onRegister}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onRegister({
      password,
      email
    });
  }

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__content" 
        action="#" 
        name="editProfile"
        onSubmit={handleSubmit}>
        <input type="email" 
          required 
          className="register__text" 
          placeholder="Email" 
          name="email"
          value={email}
          onChange={handleChangeEmail}/>
        <input type="password" 
          required 
          className="register__text" 
          placeholder="Пароль" 
          name="password"
          value={password}
          onChange={handleChangePassword}/>
        <button type="submit" className="register__submit" name="saveButton">Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" className="register__link">Уже зарегистрированы? Войти</Link>
    </div>
  );
}

export default Register;