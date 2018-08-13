const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)


exports.sendNotificationOnAcceptingChallenge = functions.database.ref(`/challenges/{path}/acceptedStatus`)
  .onUpdate(event => {
    const path = event.params.path
    admin.database()
      .ref(`/challenges/${path}`)
      .once('value')
      .then(dataSnapshot => dataSnapshot.val())
      .then(challenge => challenge.from.uid)
      .then(challengerUid => sendNotificationTo(challengerUid))
      .catch(exception => console.log('Error --', exception))
  })

//TODO - UPDATE STYLING FOR THIS
const sendNotificationTo = (uid) => {
  admin.database()
    .ref(`/fcmtokens/${uid}`)
    .once('value')
    .then(dataSnapshot => dataSnapshot.val())
    .then(dataSnapshotValue => {

      const payload = {
        notification: {
          title: 'Sport matchmaker',
          body: 'A challenge was accepted!',
          icon: 'https://image.flaticon.com/icons/svg/140/140602.svg',
          click_action: 'http://localhost:3000'
        }
      }

      //Vaatii taulukoinnin (pusheja yhdelle/monelle näin vissiin yleisesti helpommin tehdä)
      // console.log('Token (last step?)', dataSnapshotValue.token)
      return admin.messaging().sendToDevice([dataSnapshotValue.token], payload)
    })
    .catch(exception => console.log('Error --', exception))
}