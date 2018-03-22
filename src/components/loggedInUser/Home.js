import React from "react";
import { Redirect } from 'react-router-dom'

const Home = () => {
  //NON - HoC-reittiensuojaus
  //Copypasteratkaisu, mietitään parempaa toteutusta yhdessä!
  if (window.localStorage.getItem('user')) {
    return (
      <div>
        <p>Kirjautuneen käyttäjän etusivu</p>
      </div>
    )
  } else {
    return <Redirect to="/" />
  }
}

export default Home;
