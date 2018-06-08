import { db } from '../firebase/firebase'

import { SET_USERS } from '../constants/types'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USERS: {
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
    type: SET_USERS,
    //Action
    users
  }
}

export const addFriend = (currentUserPath, friendUid) => {
  console.log('Current user path -> ', currentUserPath)
  console.log('Friend uid', friendUid)
  return async () => {

  }
}

//Difference to toggleChallengeStatus is that discipline can be more than just 1 option
//So a different way to apply toggling was done here
export const toggleDisciplineStatus = (path, toggledDiscipline) => {
  return async () => {
    await db.ref(`users/${path}/disciplines`).update(toggledDiscipline)
  }
}

export const toggleChallengeStatus = (path, status) => {
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

    // Test to get rid of controlled/uncontrolled warning
    // empty object worked intially, now it doesnt (or my testing was bad)
    // either way - attempt to go around this by adding a discipline that was 
    // going to be included in this project from the very beginning
    // toggling with their update methods should do the rest
    const disciplines = { badminton: false }

    const newUser = { username, email, uid, challengeStatus, disciplines }
    await db.ref('users').push(newUser)
    // Return not needed here as fetchAndSet has a subscription method so we can check result
    // from this function there instead
  }
}

export default usersReducer