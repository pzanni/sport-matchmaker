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
    case 'UNSET_AUTH': {
      return { ...state, authUser: null }
    }
    default: return state
  }
}

export const authUserAdditionFor = (authUser) => {
  return {
    //action.type
    type: 'SET_AUTH',
    //action.authUser
    authUser
  }
}

export const authUserRemoval = () => {
  return {
    type: 'UNSET_AUTH'
  }
}

export default sessionReducer