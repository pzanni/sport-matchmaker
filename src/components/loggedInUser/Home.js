import React from "react";
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'

//Videomateriaalista löytyy ratkaisu HoC - ongelmaan
//siinä välissä on kuitenkin muuta kamaa
//joka täytyy käydä läpi
const Home = (props) => {
  const { users, session } = props
  console.log('session data in home', session)
  console.log('usersit homessa:', users)

  // const mappedUsers =
  //   users
  //     .map((user) => <p key={user.id}>{user.username} - {user.email} (id: {user.id}) (user id: {user.uid})</p>)
  // const ownUserInfo =
  //   users
  //     .filter((user) => user.uid === session.authUser.uid)
  //     .map((foundUser) => <p>{foundUser.username} - {foundUser.email} (id: {foundUser.id}) (user id: {foundUser.uid})</p>)

  //NON - HoC-reittiensuojaus
  //Copypasteratkaisu, mietitään parempaa toteutusta yhdessä!
  if (window.localStorage.getItem('user')) {
    return (
      <div>
        <p>Kirjautuneen käyttäjän etusivu</p>
        <Link to="/users">
          Linkki kaikkiin käyttäjiin. . .
        </Link>
        {/* <h3>KAIKKI KÄYTTÄJÄT</h3> */}
        {/* <Users users={users} /> */}
        {/* <h4>OMA DATA TIETOKANNASTA</h4> */}
        {/* {ownUserInfo} */}
      </div>
    )
  } else {
    return <Redirect to="/" />
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    session: state.session
  }
}

export default connect(mapStateToProps)(Home);
