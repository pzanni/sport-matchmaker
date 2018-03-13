import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyBepNgm9Htu4LqJJaqX8DbHrUqJ02BUQYw",
  authDomain: "matchmaker-dev-be06b.firebaseapp.com",
  databaseURL: "https://matchmaker-dev-be06b.firebaseio.com",
  projectId: "matchmaker-dev-be06b",
  storageBucket: "matchmaker-dev-be06b.appspot.com",
  messagingSenderId: "293311458536"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
export { auth };
