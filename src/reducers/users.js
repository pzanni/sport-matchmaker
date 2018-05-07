import { db } from '../firebase/firebase'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USERS': {
      return action.users
    }
    default:
      return state
  }
}

//Fetch / Set (action)
export const setUsers = (users) => {
  return {
    //Case
    type: 'SET_USERS',
    //Action
    users
  }
}

export const editChallengeStatus = (path, status) => {
  return async (dispatch) => {
    const updatedUser = await db.ref(`users/${path}`).update({ challengeStatus: status })
    // Return here not needed as fetchAndSet subscription handles (testing purposes)
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
      return dispatch(setUsers(userArray))
    })
  }
}

export const addFirebaseUser = (content) => {
  return async (dispatch) => {
    const { username, email, uid, challengeStatus } = content
    const newUser = { username, email, uid, challengeStatus }
    const dbUserRef = await db.ref('users').push(newUser)
    // Return not needed here as fetchAndSet has a subscription method so we can check result
    // from this function there instead
  }
}

export default usersReducer