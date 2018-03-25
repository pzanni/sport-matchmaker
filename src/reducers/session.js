const DEFAULT_STATE = {
  authUser: null
}

const sessionReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    //Sign in / Sign up
    case 'SET_AUTH': {
      console.log('set_auth kutsuttu, missä authUser:', action.authUser)
      return { ...state, authUser: action.authUser }
    }
    //Log out
    case 'UNSET_AUTH': {
      console.log('reset_auth kutsuttu', action)
      return { ...state, authUser: null }
    }
    default: return state
  }
}

//action.authUser implisiittinen
export const authUserAdditionFor = (authUser) => {
  return {
    type: 'SET_AUTH',
    //tästä saadaan action.authUser
    authUser
  }
}

//tässä ei vaadita actionia, vaan se asetetaan explisiittisesti reducerissa
export const authUserRemoval = () => {
  return {
    type: 'UNSET_AUTH'
  }
}

export default sessionReducer