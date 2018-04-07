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

//action.authUser 'implisiittinen'
export const authUserAdditionFor = (authUser) => {
  return {
    //case
    type: 'SET_AUTH',
    //action
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