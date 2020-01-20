import React from "react";
import styles from "./login.module.css";
import { connect } from "react-redux";
import { doGoogleLogAction, doLogOutAction } from "../../redux/userDuck";

function LoginPage({ fetching, loggedIn, doGoogleLogAction, doLogOutAction }) {
  function doLogin() {
    doGoogleLogAction();
  }

  function doLogout() {
    doLogOutAction();
  }

  if (fetching) return <h2>Loading...</h2>;
  return (
    <div className={styles.container}>
      {loggedIn ? (
        <div>
          <h1>Cerrar tu sesión</h1>
          <br />
          <button onClick={doLogout}>Cerrar Sesión</button>
        </div>
      ) : (
        <div>
          <h1>Inicia Sesión con Google</h1>
          <br />
          <button onClick={doLogin}>Iniciar</button>
        </div>
      )}
    </div>
  );
}

function mapStateToProps({ users: { fetching, loggedIn, logOut } }) {
  return {
    fetching,
    loggedIn
  };
}

export default connect(mapStateToProps, { doGoogleLogAction, doLogOutAction })(
  LoginPage
);
