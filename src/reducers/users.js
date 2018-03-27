import { db } from '../firebase/firebase'

const INITIAL_STATE = []
const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case 'ADD_USER': {
    //   console.log('ADD_USER kutsuttu, action: ', action)
    //   return state.concat(action.user)
    // }
    case 'SET_USERS': {
      return action.users
    }
    default:
      return state
  }
}

//Fetch / Set
const setUsers = (users) => {
  // console.log('userit firebasesta', users)
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
      // console.log('snapshot value:', snapshot.val())
      // dispatch(setUsers(snapshot.val()))
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

// const addUser = (user) => {
//   console.log('addUser dispatchattu, ...user --->', user)
//   return {
//     //Case - ADD_USER
//     type: 'ADD_USER',
//     //Action - user
//     user
//   }
// }

export const addFirebaseUser = (content) => {
  return async (dispatch) => {
    const { username, email } = content
    const newUser = { username, email }
    const dbUserRef = await db.ref('users').push(newUser)
    //Otetaan addUser pois tästä ja kokeillaan käyttää on - subscriptionia
    //viestien jatkuvaan fetchauksen (pollaus?)

    // console.log('ref key:', dbUserRef.key)
    //id ei välttämätön, push luo yhden automaattisesti ja 
    //näyttää siltä, että firebase db ignoree tuon id:n (?)
    // dispatch(addUser({ id: dbUserRef.key, ...newUser }))
  }
}

export default usersReducer