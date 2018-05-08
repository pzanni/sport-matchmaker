import React from "react";
import { Redirect, Link } from 'react-router-dom'
import { ConnectedChallengeList, ConnectedAcceptedChallengesList } from './Challenge'
import VisibilityFilter from './VisibilityFilter'

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
      <p>Alla on lista kaikista käyttäjän olemassaolevista haasteista</p>
      <VisibilityFilter />
      <ConnectedChallengeList />
      <p>Alla on lista kaikista käyttäjän hyväksytyistä haasteista</p>
      <ConnectedAcceptedChallengesList />
    </div>
  )
  // } else {
  // return <Redirect to="/" />
  // }
}

export default Home
