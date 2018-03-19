import React from 'react'
import { auth } from "./firebase";
import { Redirect } from 'react-router-dom'

// Uuden käyttäjätunnuksen luonti
export const createUserWithEmailAndPassword = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

// Käyttäjän sisäänkirjautuminen
export const signInWithEmailAndPassword = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

// Käyttäjän uloskirjautuminen
export const signOut = () => {
  window.localStorage.clear()
  return auth.signOut();
};
