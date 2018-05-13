import React from 'react'

const notifyFunc = () => {
  var key = process.env.REACT_APP_SECRET_SERVER_KEY
  console.log('avain (key) (env)', key)
  const antoninToken = 'epu7iDiu9wM:APA91bEN4CkutSzepnPKU4Q06ryHiP-RrUqS2SSjES6LpEhmds9LNWBfekxP8akc_WDJICeNBDPCxjKcE_Kn-cWvM_EqhNl4kGsPljM1wjE4eVffjJYI-M1ZKKBsPoqqTw8jMJ1V-qtj'

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
        'to': antoninToken
      })
    }, (error, response, body) => {
      if (error) {
        console.log("Error in post request!", error);
      } else {
        console.log("No error, body", body);
      }
    })
  }, 5000)

  // request({
  //   url: 'https://fcm.googleapis.com/fcm/send',
  //   method: 'POST',
  //   headers: {
  //     'Authorization': 'key=' + key,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     'notification': notification,
  //     'to': antoninToken
  //   })
  // }, (error, response, body) => {
  //   if (error) {
  //     console.log("Error in post request!", error);
  //   } else {
  //     console.log("No error, body", body);
  //   }
  // })

}

<Button style={styles.Button} color="primary" onClick={notifyFunc}>
  Notifytest
</Button>