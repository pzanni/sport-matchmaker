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

// export const createChallenge = (from, to) => {
//   return async (dispatch) => {
//     const challenger = from.username
//     const opponent = to.username
//     const path = from.id

//     console.log(`${challenger} wants to challenge ${opponent}`)
//     // 1. Create challenge proposal
//     // 2. Send proposal to opponent
//     // 2.1 -> maybe to /challengers -> filter those where id is for opponent?
//     // 3. Opponent should be able to accept challenges from another method
//     // 4. Create match based on opponent accepting said challenge

//     // ADD THIS TO EACH USER IN CASE OF TIME COMPLEXITY CONSTRAINTS
//     const pendingChallenge = await db.ref(`users/${path}/challenges`).push({
//       opponentPath: to.id,
//       opponent,
//       accepted: false
//     })


//   }
// }

export const acceptChallenge = (from, to) => {
  return async (dispatch) => {
    // Function proposal
    // 1. Accepted -> true. Need to find matching id (path) first though
    // 2. use SET - method to overwrite method data OR UPDATE depending on whether previous data is needed
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