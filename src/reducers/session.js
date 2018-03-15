const DEFAULT_STATE = {
  authUser: null
}

sessionReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    //Sign in / Sign up
    case 'SET_AUTH': {
      return { ...state, authUser: action.authUser }
    }
    //Log out
    case 'RESET_AUTH': {
      //Saattaa vaatia SET_AUTH:n tyylisen muutoksen jos allaoleva default ei toimi
      return DEFAULT_STATE
    }
    default: return state
  }
}

export default sessionReducer