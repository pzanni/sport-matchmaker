import React from "react";
import { Redirect, Link } from 'react-router-dom'
import { ConnectedChallengeList } from './Challenge'

//Videomateriaalista löytyy ratkaisu HoC - ongelmaan
//siinä välissä on kuitenkin muuta kamaa
//joka täytyy käydä läpi
const Home = (props) => {
  //NON - HoC-reittiensuojaus
  //Copypasteratkaisu, mietitään parempaa toteutusta yhdessä!
  // if (window.localStorage.getItem('user')) {
  return (
    <div className="homeRoot">
      <p>Kirjautuneen käyttäjän etusivu</p>
      <p>Alla on lista kaikista olemassaolevista haasteista</p>
      <ConnectedChallengeList />
    </div>
  )
  // } else {
  // return <Redirect to="/" />
  // }
}

export default Home
