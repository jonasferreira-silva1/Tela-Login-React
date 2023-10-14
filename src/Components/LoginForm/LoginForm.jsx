import React, { useState } from "react";
import "./LoginForm.css";
import Card from "../Card/Card";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { database } from "../../utils/database";

const LoginForm = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const errors = {
    username: "Nome de usuário Inválido",
    password: "Senha Inválida",
    noUsername: "Por favor, insira seu nome de usuário",
    noPassword: "Por favor, insira sua senha",
  };

  const handleSubmit = (e) => {
    // Evita a recarga da página
    e.preventDefault();

    if (!username) {
      // O campo de nome de usuário está vazio
      setErrorMessages({ name: "noUsername", message: errors.noUsername });
      return;
    }

    if (!password) {
      // O campo de senha está vazio
      setErrorMessages({ name: "noPassword", message: errors.noPassword });
      return;
    }

    // Procura pelas credenciais do usuário
    const currentUser = database.find((user) => user.username === username);

    if (currentUser) {
      if (currentUser.password !== password) {
        // Senha incorreta
        setErrorMessages({ name: "password", message: errors.password });
      } else {
        // Senha correta, faz o login do usuário
        setErrorMessages({});
        setIsLoggedIn(true);
      }
    } else {
      // Nome de usuário não existe no banco de dados
      setErrorMessages({ name: "username", message: errors.username });
    }
  };

  // Renderiza mensagens de erro
  const renderErrorMsg = (name) =>
    name === errorMessages.name && (
      <p className="error_msg">{errorMessages.message}</p>
    );

  return (
    <Card>
      <h1 className="title">Entrar</h1>
      <p className="subtitle">
        Por favor, faça o login usando seu nome de usuário e senha!
      </p>
      <form onSubmit={handleSubmit}>
        <div className="inputs_container">
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {renderErrorMsg("username")}
          {renderErrorMsg("noUsername")}
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {renderErrorMsg("password")}
          {renderErrorMsg("noPassword")}
        </div>
        <input type="submit" value="Entrar" className="login_button" />
      </form>
      <div className="link_container">
        <a href="" className="small">
          Esqueceu a senha?
        </a>
      </div>
      <div className="icons">
        <GoogleIcon className="icon" />
        <FacebookIcon className="icon" />
        <TwitterIcon className="icon" />
      </div>
    </Card>
  );
};

export default LoginForm;
