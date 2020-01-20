import React, { useState, useEffect } from "react";
import Card from "../card/Card";
import styles from "./home.module.css";
import { connect } from "react-redux";
import {
  removeCharactersAction,
  addToFavoritesAction
} from "../../redux/charsDuck";

function Home({ chars, removeCharactersAction, addToFavoritesAction }) {
  function renderCharacter() {
    let char = chars[0];
    return (
      <Card leftClick={nextCharacter} rightClick={addToFavorite} {...char} />
    );
  }

  function nextCharacter() {
    removeCharactersAction();
  }

  function addToFavorite() {
    addToFavoritesAction();
  }

  return (
    <div className={styles.container}>
      <h2>Personajes de Rick y Morty</h2>
      <div>{renderCharacter()}</div>
    </div>
  );
}

function mapStateToProps(state) {
  return { chars: state.characters.array };
}

export default connect(mapStateToProps, {
  removeCharactersAction,
  addToFavoritesAction
})(Home);
