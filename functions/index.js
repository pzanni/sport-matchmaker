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
          title: 'Your challenge was accepted',
          body: `Go check out whats up!!`,
        }
      }

      //Vaatii taulukoinnin (pusheja yhdelle/monelle näin vissiin yleisesti helpommin tehdä)
      // console.log('Token (last step?)', dataSnapshotValue.token)
      return admin.messaging().sendToDevice([dataSnapshotValue.token], payload)
    })
    .catch(exception => console.log('Error --', exception))
}