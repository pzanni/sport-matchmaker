import { setUsers } from '../reducers/users'

it('should create an action of type SET_USERS for altering user state from given array of users', () => {
  const firstUser = { username: 'Anton', email: 'anton@anton.com' }
  const secondUser = { username: 'Anni', email: 'anni@anni.com' }
  const users = [firstUser, secondUser]

  const action = setUsers(users)

  //toBe ei toimi objekteille, tarvitaan toEqual jokaisen keyn vertailua varten
  expect(action).toEqual({
    type: 'SET_USERS',
    users
  })
})