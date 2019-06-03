import Vue from 'vue'
import App from './App.vue'
import {store} from './store/'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  created() {

  firebase.initializeApp({
    apiKey: 'AIzaSyCvUMC4avWKwD6ZN72iU5bnRR_fHEvS5Jo',
    authDomain: 'this-chatapp.firebaseapp.com',
    databaseURL: 'https://this-chatapp.firebaseio.com',
    projectId: 'this-chatapp',
    storageBucket: '',
    messagingSenderId: '50135964078',
    appId: '1:50135964078:web:6c265b028b1d5ad1'
  })

  //check if auth
  firebase.auth().onAuthStateChanged((user) => {
//     console.log('auth listener', user)
    if(user) {
      //load online users from firebase
      console.log('user: ', user)
//       this.$store.dispatch('loadOnlineUsers')
    }
  })

  //load projects from firebase
//   this.$store.dispatch('loadProjects')
  //load chats from firebase
//   this.$store.dispatch('loadChats')
  }
}).$mount('#app')
