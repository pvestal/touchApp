import firebase from 'firebase/app'


const messaging = firebase.messaging()
messaging.requestPermission()
.then(function() {
console.log("permission granted")
return messaging.getToken()
})
.then(function(token) {
console.log(token)
})
.catch(function(err) {
console.log(err)
})

messaging.onMessage(function(payload) {
  console.log('onMessage: ', payload)
})
