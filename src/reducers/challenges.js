import { db } from '../firebase/firebase'
import { sendNotification } from '../firebase/messaging'

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

//This could also be indexed and have a separate /messages path instead
//Could also use a time library for when the message was sent
export const sendFirebaseMessage = (path, sender, content, timeStamp) => {
  return async () => {
    const newMessage = { sender, content, timeStamp }
    await db.ref(`challenges/${path}/messages`).push(newMessage)
  }
}

export const addFirebaseChallenge = (from, to, chosenDiscipline) => {
  // console.log('chosen discipline', chosenDiscipline)
  return async () => {
    const newChallenge = { from, to, acceptedStatus: false, discipline: chosenDiscipline }
    await db.ref('challenges').push(newChallenge)
  }
}

//Add 2nd param to notify challenger on accept
export const acceptChallenge = (path, challengerUid) => {
  // console.log('challenger uid from within acceptChallenge', challengerUid)
  return async () => {
    await db.ref(`challenges/${path}`).update({ acceptedStatus: true, completed: false })
    //Send notification to the challenger of challenge acception
    //This part should really be in cloud functions but nothing is free :(
    //If a low cost method is found then launching the code below should
    //happen on condition above (from within cloud functions...)
    // try {
    //   await db.ref(`fcmtokens/${challengerUid}`).once('value', (snapshot) => {
    //     sendNotification(snapshot.val().token)
    //   })
    // } catch (exception) {
    //   console.log(exception)
    //   console.log('Not evenone has accepted notification permission')
    // }

    // NOTIFICATIONS CURRENTLY COMMENTED OUT
    // NOTIFICATIONS CURRENTLY COMMENTED OUT
    // NOTIFICATIONS CURRENTLY COMMENTED OUT
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

// Ottelun toinen osapuoli hyväksyy ottelun tuloksen
// Pisteet / pushataan kamaa matches - puuhun tilastoja varten?
export const completeChallenge = (path) => {
  return async () => {
    await db.ref(`challenges/${path}`).update({ completed: true })
  }
  //Function proposal
  // 1. update challenges (from path) so that match - object is included
  // 2. (not absolutely necessary) require both parties to accept result (?)
  // 3. If there are pending results -> do not allow behaviour in bad faith (not accepting result)
  // and do not allow said user to challenge others / accept challenges from others while confirmation is pending
}

export default challengesReducer