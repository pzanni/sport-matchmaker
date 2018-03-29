import { setUsers } from '../reducers/users'
import { users } from './testData'

it('should create an action of type SET_USERS for altering user state from given array of users', () => {
  const action = setUsers(users)

  //toBe ei toimi objekteille, tarvitaan toEqual jokaisen keyn vertailua varten
  expect(action).toEqual({
    type: 'SET_USERS',
    users
  })
})