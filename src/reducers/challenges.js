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

//Siirretty userseista challegeihin. 
//TODO - update s.e lisätään ottelukenttä tuloksille tms.
//Tulokset voisivat antaa pisteitä (myöhempi toteutus, tehdään ottelut ensin)
export const acceptChallenge = (path) => {
  return async (dispatch) => {
    console.log('haaste hyväksytty - path:', path)
    await db.ref(`challenges/${path}`).update({ 
      acceptedStatus: true
    })
    // Function proposal
    // 1. Accepted -> true.
    // 2. Create new match from given parameters
  }
}

export default challengesReducer