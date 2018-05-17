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

//Difference to editChallengeStatus is that discipline can be more than just 1 option
//So a different way to apply toggling was done here
export const toggleDisciplineStatus = (path, discipline) => {
  return async () => {
    await db.ref(`users/${path}/disciplines`).update(discipline)
  }
}

export const editChallengeStatus = (path, status) => {
  return async () => {
    await db.ref(`users/${path}`).update({ challengeStatus: status })
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
  return async () => {
    const { username, email, uid } = content
    const challengeStatus = false
    const disciplines = {} // Test to get rid of controlled/uncontrolled switch warning - SEEMS TO DO THE JOB
    const newUser = { username, email, uid, challengeStatus, disciplines }
    await db.ref('users').push(newUser)
    // Return not needed here as fetchAndSet has a subscription method so we can check result
    // from this function there instead
  }
}

export default usersReducer