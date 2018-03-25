import { db } from './firebase'

// Create User
export const createUser = (userName, email) => {
  const usersRef = db.ref('users')
  const newUserRef = usersRef.push({
    userName,
    email
  })
}

// Get all Users (JUST ONCE)
export const getAllUsers = () => {
  return db.ref('users').once('value')
}