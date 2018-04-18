import React from "react";
import { Redirect, Link } from 'react-router-dom'

//Videomateriaalista löytyy ratkaisu HoC - ongelmaan
//siinä välissä on kuitenkin muuta kamaa
//joka täytyy käydä läpi
const Home = (props) => {
  //NON - HoC-reittiensuojaus
  //Copypasteratkaisu, mietitään parempaa toteutusta yhdessä!
  if (window.localStorage.getItem('user')) {
    return (
      <div className="homeRoot">
        <p>Kirjautuneen käyttäjän etusivu</p>
        <p>Tabseista linkki kaikkiin käyttäjiin...</p>
      </div>
    )
  } else {
    return <Redirect to="/" />
  }
}

export default Home;
