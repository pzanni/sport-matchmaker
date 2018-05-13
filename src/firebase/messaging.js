import { messaging, db } from './firebase'
import request from 'request'

const notifyFunc = (token) => {
  var key = process.env.REACT_APP_SECRET_SERVER_KEY
  var notification = {
    'title': 'Match found!',
    'body': 'Go check out whats up !!!',
    'icon': 'https://image.flaticon.com/icons/svg/140/140602.svg',
    'click_action': 'http://localhost:3000'
  }

  setTimeout(() => {
    request({
      url: 'https://fcm.googleapis.com/fcm/send',
      method: 'POST',
      headers: {
        'Authorization': 'key=' + key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'notification': notification,
        'to': token
      })
    }, (error, response, body) => {
      if (error) {
        console.log("Error in post request!", error);
      } else {
        console.log("No error, body", body);
      }
    })
  }, 3000)
}

export const sendNotification = (challengerToken) => {
  notifyFunc(challengerToken)
}

// TRY LIMITING TOKEN TO ONLY 1 PER actual user (so others dont receive foreign notifications, this might happen if multiple logins are performed from 1 computer)
// Idea - each token has session.authUser.uid assigned on login
// if user does not have a token then one should be dispatched / created ?

messaging.onMessage((payload) => {
  // Add Message component to App?
  // -> Change state to inform user of a match for a few seconds
  console.log('onMessage: ', payload.notification)
})