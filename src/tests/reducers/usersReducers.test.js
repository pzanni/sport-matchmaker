import usersReducer from '../../reducers/users'
import { setUsers } from '../../reducers/users'
import { users } from '../testData'

describe('users reducer', () => {

  it('should set current user state from given user array via SET_USERS action', () => {
    const action = setUsers(users)
    const resultState = usersReducer([], action)
    expect(resultState).toEqual(users)
  })
})
