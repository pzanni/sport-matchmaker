import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { setUsers, addFirebaseUser, fetchAndSetFirebaseUsers } from '../reducers/users'
import { users } from './testData'
import { db } from '../firebase/firebase'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('user actions', () => {

  it('should create an action of type SET_USERS for altering user state from given array of users', () => {
    const action = setUsers(users)

    //toBe ei toimi objekteille, tarvitaan toEqual jokaisen keyn vertailua varten
    expect(action).toEqual({
      type: 'SET_USERS',
      users
    })
  })

  // Käytetään firebasen metodeja / action creatoreja datan
  // puskemisen tietokantaan
  // - KOSKA - käytössä on subscription (on)
  
  //TESTI KESKENERÄINEN -- Yritän saada apua jostain...
  // it('should show new added user from database', async (done) => {
  //   const initialState = {}
  //   const store = mockStore(initialState)

  //   const randInt = Math.floor(Math.random() * 1000000) + 1
  //   const testUserData = {
  //     username: `AntonM${randInt}`,
  //     email: `AntonM${randInt}@test.com`,
  //     uid: randInt,
  //     challengeStatus: false
  //   }

  //   const beforeAdd = await store.dispatch(fetchAndSetFirebaseUsers())
  //   await store.dispatch(addFirebaseUser(testUserData))
  //   const afterAdd = await store.dispatch(fetchAndSetFirebaseUsers())
  //   console.log('before', beforeAdd)
  //   console.log('after', afterAdd)
  //   done()
  // })
})