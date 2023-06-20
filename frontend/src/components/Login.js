import React from "react";
import { Link } from "react-router-dom";

function Login ({onLogin}) {
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

    onLogin({
      password,
      email
    });
  }

  return (
    <div className="register">
      <h2 className="register__title">Вход</h2>
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
          onChange={handleChangeEmail} autoComplete="on"/>
        <input type="password" 
          required 
          className="register__text" 
          placeholder="Пароль" 
          name="password"
          value={password}
          onChange={handleChangePassword}/>
        <button type="submit" className="register__submit" name="saveButton">Войти</button>
      </form>
    </div>
  );
}

export default Login;