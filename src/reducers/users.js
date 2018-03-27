import { db } from '../firebase/firebase'

const INITIAL_STATE = []
const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USERS': {
      return action.users
    }
    default:
      return state
  }
}

//Fetch / Set (action)
const setUsers = (users) => {
  return {
    //Case
    type: 'SET_USERS',
    //Action
    users
  }
}

export const fetchAndSetFirebaseUsers = () => {
  return async (dispatch) => {
    await db.ref('users').on('value', (snapshot) => {
      const userArray = []
      snapshot.forEach((childSnapshot) => {
        userArray.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
      dispatch(setUsers(userArray))
    })
  }
}

export const addFirebaseUser = (content) => {
  return async (dispatch) => {
    const { username, email } = content
    const newUser = { username, email }
    const dbUserRef = await db.ref('users').push(newUser)
  }
}

export default usersReducer