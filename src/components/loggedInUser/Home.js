import React from "react";
import { Redirect, Link } from 'react-router-dom'
import { ConnectedChallengeList, ConnectedAcceptedChallengesList } from './Challenge'
import VisibilityFilter from './VisibilityFilter'

const Home = (props) => {
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
}

export default Home
