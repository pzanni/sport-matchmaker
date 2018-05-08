import { db } from '../firebase/firebase'

const challengesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CHALLENGES': {
      return action.challenges
    }
    default:
      return state
  }
}

export const setChallenges = (challenges) => {
  return {
    //Action
    //.type
    type: 'SET_CHALLENGES',
    //.challenges
    challenges
  }
}

export const fetchAndSetChallenges = () => {
  return async (dispatch) => {
    await db.ref('challenges').on('value', (snapshot) => {
      const challengesArray = []
      snapshot.forEach((childSnapshot) => {
        challengesArray.push({
          path: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
      return dispatch(setChallenges(challengesArray))
    })
  }
}

export const addFirebaseChallenge = (from, to) => {
  return async (dispatch) => {
    const newChallenge = { from, to, acceptedStatus: false }
    await db.ref('challenges').push(newChallenge)
  }
}

export const acceptChallenge = (path) => {
  return async (dispatch) => {
    console.log('haaste hyväksytty - path:', path)
    await db.ref(`challenges/${path}`).update({
      acceptedStatus: true
    })
    // Function proposal
    // 1. Accepted -> true.
    // 2. AcceptedChallengeList - component checks for them (accepted challenges) 
    //  and match creation / challenge completion continues there
  }
}

//NAME CHANGE PROBABLY GOOD?
export const completeChallenge = (path) => {
  return async (dispatch) => {

  }
  //Function proposal
  // 1. update challenges (from path) so that match - object is included
  // 2. (not absolutely necessary) require both parties to accept result (?)
  // 3. If there are pending results -> do not allow behaviour in bad faith (not accepting result)
  // and do not allow said user to challenge others / accept challenges from others while confirmation is pending
}

export default challengesReducer