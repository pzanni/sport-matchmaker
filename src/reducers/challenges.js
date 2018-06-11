import { db } from '../firebase/firebase'
import { sendNotification } from '../firebase/messaging'

import { SET_CHALLENGES } from '../constants/types'

const challengesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CHALLENGES: {
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
    type: SET_CHALLENGES,
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

//This could also be indexed and have a separate /messages path instead
export const sendFirebaseMessage = (path, sender, content, timeStamp) => {
  return async () => {
    const newMessage = { sender, content, timeStamp }
    await db.ref(`challenges/${path}/messages`).push(newMessage)
  }
}

export const addFirebaseChallenge = (from, to, chosenDiscipline) => {
  return async () => {
    const newChallenge = { from, to, acceptedStatus: false, discipline: chosenDiscipline }
    await db.ref('challenges').push(newChallenge)
  }
}

//Add 2nd param to notify challenger on accept
export const acceptChallenge = (path, challengerUid) => {
  return async () => {
    await db.ref(`challenges/${path}`).update({ acceptedStatus: true, completed: false })
  }
}

export const declineChallenge = (path) => {
  return async () => {
    await db.ref(`challenges/${path}`).remove()
  }
}

//Jostain syystä 2 parametrin kanssa (path, result) result on undefined
//Kierretään ongelma laittamalla objekti yhtenä parametrinä (path, result)
//Ja puretaan se tässä metodissa
export const setChallengeResult = (options) => {
  return async () => {
    const { path, match } = options
    await db.ref(`challenges/${path}`).update({ match })
  }
}

//Remove match proposal (set up by opponent)
export const declineChallengeResult = (path) => {
  return async () => {
    await db.ref(`challenges/${path}/match`).remove()
  }
}

// Ottelun toinen osapuoli hyväksyy ottelun tuloksen
// TODO (future) Pisteet / pushataan kamaa matches - puuhun tilastoja varten?
export const completeChallenge = (path) => {
  return async () => {
    await db.ref(`challenges/${path}`).update({ completed: true })
  }
}

export default challengesReducer