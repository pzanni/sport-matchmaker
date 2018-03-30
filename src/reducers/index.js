import { combineReducers } from 'redux'
import sessionReducer from './session'
import usersReducer from './users'
import navigationReducer from './navigation'

const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  navigation: navigationReducer
})

export default rootReducer