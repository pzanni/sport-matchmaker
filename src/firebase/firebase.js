import * as firebase from "firebase"

const config = {
  apiKey: "AIzaSyBepNgm9Htu4LqJJaqX8DbHrUqJ02BUQYw",
  authDomain: "matchmaker-dev-be06b.firebaseapp.com",
  databaseURL: "https://matchmaker-dev-be06b.firebaseio.com",
  projectId: "matchmaker-dev-be06b",
  storageBucket: "matchmaker-dev-be06b.appspot.com",
  messagingSenderId: "293311458536"
}

// const productionConfig = {
//   apiKey: "AIzaSyBepNgm9Htu4LqJJaqX8DbHrUqJ02BUQYw",
//   authDomain: "matchmaker-dev-be06b.firebaseapp.com",
//   databaseURL: "https://matchmaker-dev-be06b.firebaseio.com",
//   projectId: "matchmaker-dev-be06b",
//   storageBucket: "matchmaker-dev-be06b.appspot.com",
//   messagingSenderId: "293311458536"
// }

// const developmentConfig = {
//   apiKey: "AIzaSyDAvR8jpSOgKhiTxOAMnxC89h4mdYA6ho4",
//   authDomain: "matchmaker-test.firebaseapp.com",
//   databaseURL: "https://matchmaker-test.firebaseio.com",
//   projectId: "matchmaker-test",
//   storageBucket: "",
//   messagingSenderId: "144779541380"
// }

// let config = process.env.NODE_ENV === 'production'
//   ? productionConfig
//   : developmentConfig

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()
const db = firebase.database()
const messaging = firebase.messaging()

export { auth, db, messaging }
