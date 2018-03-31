import React from "react";
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

//Videomateriaalista löytyy ratkaisu HoC - ongelmaan
//siinä välissä on kuitenkin muuta kamaa
//joka täytyy käydä läpi
const Home = (props) => {
  const { users } = props
  console.log('usersit homessa:', users)
  const mappedUsers = users.map((user) => <p key={user.id}>{user.username} - {user.email} (id: {user.id}) (user id: {user.uid})</p>)
  //NON - HoC-reittiensuojaus
  //Copypasteratkaisu, mietitään parempaa toteutusta yhdessä!
  if (window.localStorage.getItem('user')) {
    return (
      <div>
        <p>Kirjautuneen käyttäjän etusivu</p>
        <p>Käyttäjälistakamaa suoraan tietokannasta alla...</p>
        {mappedUsers}
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
