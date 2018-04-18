import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import faker from 'faker'

import { setUsers, addFirebaseUser, fetchAndSetFirebaseUsers } from '../../reducers/users'
import { users } from '../testData'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('user actions', () => {
  let initialState
  let store

  beforeEach(async () => {
    initialState = {}
    store = mockStore(initialState)
    //Set subscription ON - pakko alustaa - järjestys silti omituinen .. ??
    await store.dispatch(fetchAndSetFirebaseUsers())
  })

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

  //COMMENTED OUT WHILE TESTING PUPPETEER
  //COMMENTED OUT WHILE TESTING PUPPETEER
  //COMMENTED OUT WHILE TESTING PUPPETEER
  //COMMENTED OUT WHILE TESTING PUPPETEER
  //COMMENTED OUT WHILE TESTING PUPPETEER
  //COMMENTED OUT WHILE TESTING PUPPETEER
  //COMMENTED OUT WHILE TESTING PUPPETEER
  //COMMENTED OUT WHILE TESTING PUPPETEER
  //COMMENTED OUT WHILE TESTING PUPPETEER
  //COMMENTED OUT WHILE TESTING PUPPETEER
  //COMMENTED OUT WHILE TESTING PUPPETEER
  // it('should show new added user from database', async () => {
  //   //Set subscription ON - pakko alustaa - järjestys silti omituinen .. ??
  //   // await store.dispatch(fetchAndSetFirebaseUsers())

  //   const randomName = faker.name.findName()
  //   const randomEmail = faker.internet.email()
  //   const randomId = faker.random.uuid()

  //   const testUser = {
  //     username: randomName,
  //     email: randomEmail,
  //     uid: randomId,
  //     challengeStatus: false
  //   }

  //   // console.log('test user:', testUser)
  //   await store.dispatch(addFirebaseUser(testUser))
  //   const actions = await store.getActions()
  //   // on subscription fetchAndSetistä antaa todella hassunnäköisen tuloksen
  //   // käyttäjät saadaan 1. dispatchatusta actionista (fetchAndSet) joka syystä tai toisesta
  //   // laukaistaan 1. kerran vasta addFireBaseUserin dispatchauksen jälkeen??? 
  //   const users = actions[0].users
  //   console.log('first action users', users)
  //   const length = users.length
  //   // console.log('users length', length)
  //   // console.log('latest user', users[length - 1])
  //   const latestUserDB = users[length - 1]
  //   expect(testUser.email).toEqual(latestUserDB.email) // 1 email per käyttäjä 
  // })

  it('should show new challenge status for newly created user who had it changed', async () => {

  })
})