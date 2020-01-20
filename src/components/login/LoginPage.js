import React from "react";
import styles from "./login.module.css";
import { connect } from "react-redux";
import { doGoogleLogAction } from "../../redux/userDuck";

function LoginPage({ fetching, doGoogleLogAction }) {
  function doLogin() {
    doGoogleLogAction();
  }

  if (fetching) return <h2>Loading...</h2>;
  return (
    <div className={styles.container}>
      <h1>Inicia Sesión con Google</h1>
      <h1>Cierra tu sesión</h1>
      <button onClick={doLogin}>Iniciar</button>
      <button>Cerrar Sesión</button>
    </div>
  );
}

function mapStateToProps({ users: { fetching } }) {
  return { fetching };
}

export default connect(mapStateToProps, { doGoogleLogAction })(LoginPage);
