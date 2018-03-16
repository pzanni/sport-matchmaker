const DEFAULT_STATE = {
  authUser: null
}

const sessionReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    //Sign in / Sign up
    case 'SET_AUTH': {
      return { ...state, authUser: action.authUser }
    }
    //Log out
    case 'RESET_AUTH': {
      return { ...state, authUser: null }
    }
    default: return state
  }
}

export default sessionReducer