import firebase from 'firebase/app'
import 'firebase/auth'
// import 'firebase/database'
import 'firebase/firestore'
// import format from 'date-fns/format'

const AuthModule = {
  state: {
    user: null,
    users: [],
  },
  mutations: {
    SET_USER (state, payload) {
      state.user = payload
      // const userListRef = firebase.database().ref('presence')
      // const myUserRef = userListRef.push()

      // firebase.database().ref('.info/connected').on('value', snap => {
      //       if (snap.val()) {
      //         // if we lose network then remove this user from the list
      //         myUserRef.onDisconnect().remove()
      //         // set user's online status
      //         let presenceObject = {user: payload, status: 'online'}
      //         myUserRef.set(presenceObject)
      //       } else {
      //         // client has lost network
      //         let presenceObject = {user: payload, status: 'offline'}
      //         myUserRef.set(presenceObject)
      //       }
      //     }
      //   )
    },
    PUSH_USERGAME(state, payload) {
      state.user.games.push(payload.game)
    },
    SET_USERGAMES(state, payload) {
      state.user.games = payload
    }
  },
  actions: {
    googleSignIn({commit, dispatch}, user) {
      commit('SET_LOADING', true)
      let provider = new firebase.auth.GoogleAuthProvider()
      //https://developers.google.com/identity/protocols/googlescopes#oauth2v2
      provider.addScope("https://www.googleapis.com/auth/userinfo.email")
      provider.addScope("https://www.googleapis.com/auth/userinfo.profile")
      firebase.auth().signInWithPopup(provider)
      .then(googleData => {
        user = googleData.user
        const googleUser = {
          uid: user.uid, 
          displayName: user.displayName, 
          email: user.email,
          photoURL: user.photoURL,
          created: user.metadata.creationTime,
          lastSignIn: user.metadata.lastSignInTime,
          games: []
        }
        // firebase.database().ref('users').child(user.uid).set(googleUser)
        firebase.firestore().collection('users').doc(user.uid).set(googleUser)
        commit('SET_USER', googleUser)
      })
      .then(() => {
        dispatch('getUserFireStoreGames', user)
      })
      .catch(error => console.log(error))
      // let user = firebase.auth().currentUser
      
      // firebase.firestore().collection('users').doc(user.uid).set({
      //       id: user.uid, 
      //       displayName: user.displayName, 
      //       photoURL: user.photoURL,
      //       created: user.metadata.creationTime,
      //       lastSignIn: user.metadata.lastSignInTime
      // })
      // .catch(error => console.log(error))
    },
    googleSignOut() {
      firebase.auth().signOut()
      .then(() => {
        console.log("sign out called")
      })
    },
  },
  getters: {
    user(state) {
      return state.user
    },
    getUserGames(state) {
        return state.user.games
    }
  }
}

export default AuthModule