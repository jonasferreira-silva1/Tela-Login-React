import React from "react";
import "./LoggedIn.css";

const LoggedIn = ({ setIsLoggedIn }) => {
  return (
    <>
      <h1 className="title">Agora você está logado!</h1>
      <button className="back_button" onClick={() => setIsLoggedIn(false)}>
        Volte
      </button>
    </>
  );
};

export default LoggedIn;
