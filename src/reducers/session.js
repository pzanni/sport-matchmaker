const DEFAULT_STATE = {
  authUser: null,
  token: null
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
    //Add token on Sign in (?)
    case 'SET_TOKEN': {
      return { ...state, token: action.token }
    }
    default: return state
  }
}

export const setToken = (token) => {
  return {
    type: 'SET_TOKEN',
    token
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