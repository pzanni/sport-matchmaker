import { db } from '../firebase/firebase'

const INITIAL_STATE = []
const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_USER': {
      console.log('ADD_USER kutsuttu, action: ', action)
      return state.concat(action.user)
    }
    default:
      return state
  }
}

const addUser = (user) => {
  console.log('addUser dispatchattu, ...user --->', user)
  return {
    //Case - ADD_USER
    type: 'ADD_USER',
    //Action - user
    user
  }
}

export const addFirebaseUser = (content) => {
  return async (dispatch) => {
    const { username, email } = content
    const newUser = { username, email }
    const dbUserRef = await db.ref('users').push(newUser)
    console.log('ref key:', dbUserRef.key)
    //id ei välttämätön, push luo yhden automaattisesti ja 
    //näyttää siltä, että firebase db ignoree tuon id:n (?)
    dispatch(addUser({ id: dbUserRef.key, ...newUser }))
  }
}

export default usersReducer