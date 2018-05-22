import { SET_PENDING_FILTER, SET_ACCEPTED_FILTER } from '../constants/types'
import { ALL } from '../constants/filterStates'

const INITIAL_STATE = {
  pendingChallenges: ALL,
  acceptedChallenges: ALL
}

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PENDING_FILTER: {
      return { ...state, pendingChallenges: action.filter }
    }
    case SET_ACCEPTED_FILTER: {
      return { ...state, acceptedChallenges: action.filter }
    }
    default:
      return state
  }
}

export const pendingFilterChange = (filter) => {
  return {
    type: SET_PENDING_FILTER,
    filter
  }
}

export const acceptedFilterChange = (filter) => {
  return {
    type: SET_ACCEPTED_FILTER,
    filter
  }
}

export default filterReducer