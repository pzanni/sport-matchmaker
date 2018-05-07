//actionissa challenges, ja authUserId (session.authUser.uid)

const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER': {
      return action.filter
    }
    default:
      return state
  }
}

export const filterChange = (filter) => {
  return {
    //action.type
    type: 'SET_FILTER',
    //action.filter
    filter

  }
}

export default filterReducer