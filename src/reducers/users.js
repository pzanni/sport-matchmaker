const INITIAL_STATE = {
  users: null
}

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_ALL_USERS': {
      console.log('SET_ALL_USERS kutsuttu')
      return { ...state, users: action.users }
    }
    default:
      return state
  }
}

export default usersReducer