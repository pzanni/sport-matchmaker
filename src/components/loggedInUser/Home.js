import React from "react";
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

//Videomateriaalista löytyy ratkaisu HoC - ongelmaan
//siinä välissä on kuitenkin muuta kamaa
//joka täytyy käydä läpi
const Home = (props) => {
  const { users } = props
  console.log('usersit homessa:', users)
  //NON - HoC-reittiensuojaus
  //Copypasteratkaisu, mietitään parempaa toteutusta yhdessä!
  if (window.localStorage.getItem('user')) {
    return (
      <div>
        <p>Kirjautuneen käyttäjän etusivu</p>
        <p>Käyttäjälistakamaa suoraan tietokannasta...</p>
      </div>
    )
  } else {
    return <Redirect to="/" />
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Home);
