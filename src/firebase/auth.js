import { auth } from "./firebase";

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
  return auth.signOut();
};
