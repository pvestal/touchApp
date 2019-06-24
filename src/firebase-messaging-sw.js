import firebase from 'firebase/app'
import 'firebase/messaging'
import 'firebase/auth'

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.


// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// Add the public key generated from the console here.
messaging.usePublicVapidKey("BHRScCcsbDTI9XrZ79m1-QV9n4fN7wANdYhXLe2CiqZwo05K3z8QQpvBc9LWtwERD5WsjjgV3fMm7G-h7zKOi7Q");

    messaging().requestPermission()
        .then((permission) => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
            // TODO(developer): Retrieve an Instance ID token for use with FCM.
            
          } else {
            console.log('Unable to get permission to notify.');
          }
        })
        .then(() => {
          return messaging.getToken()
        })
        .then((token) => {
          console.log("token: ", token)
        })
        .catch(error => console.log(error))
    
    messaging.onMessage(function(payload) {
        console.log('onMessage: ', payload)
    })
