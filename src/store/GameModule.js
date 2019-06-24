import firebase from 'firebase/app'
import 'firebase/firestore'
import format from 'date-fns/format'


const GameModule = {
    state: {
        games: [],
    },
    mutations: {
        PUSH_GAME(state, payload) {
            state.games.push(payload)
        },
        SET_GAMES(state, payload) {
            state.games = payload
        },
        SET_GAME_JOINER(state, payload) {
            let game = state.games.find(game => game.id === payload.gameId)
                game.joiner = payload.joinUser
        },
        SET_GAME_COUNT(state, payload) {
            let game = state.games.find(game => game.id === payload.gameId)
                game.count = payload.count
        },
        INCREMENT_GAME_COUNT(state, payload) {
            let game = state.games.find(game => game.id === payload.gameId)
                game.count++
        },
        SET_GAME_LASTUPDATED(state, payload) {
            let game = state.games.find(game => game.id === payload.gameId)
                game.lastUpdatedBy = payload.lastUpdatedBy
        }
    },
    actions: {
        createGame({commit}, user) {
            let gameId
            const currentGame = {
                creator: {
                uid: user.uid,
                displayName: user.displayName,
                },
            lastUpdatedBy: user,
            gameStatus: 'OPEN',
            count: 0,
            created: format(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
            }
        firebase.firestore().collection('games').add(currentGame)
        .then(gameRef => {
            gameId = gameRef.id
            firebase.firestore().collection('games').doc(gameRef.id).update({id: gameRef.id})
            commit('PUSH_GAME', {
                ...currentGame,
                id: gameRef.id
            })
            //console.log("gameId: ", gameId)
        })
        .then(() => {
            // firebase.firestore().collection('users').doc(user.uid).add(currentGame)
            firebase.firestore().collection('/users/' + user.uid + '/games/').doc(gameId).add(currentGame)
            commit('PUSH_USERGAME', {
                game: {
                    ...currentGame, 
                    id: gameId}
            })
        })
        .catch(error => console.log(error))
        },
        incrementCount({commit}, game) {
          firebase.firestore().collection('games').doc(game.id).update({
            count: game.count,
            lastUpdatedBy: game.lastUpdatedBy,
            updated: game.updated
          })
          .then(() => {
              console.log("db updated")
          })
          .catch(function(error) {
              console.error("Error writing document: ", error)
          })
        },
        firestoreListener({commit}, gameId) {
          firebase.firestore().collection('games').doc(gameId)
          .onSnapshot(snapshot => {
            console.log("Current data: ", snapshot.data())
            // console.log("dbuser", snapshot.data().user) 
            commit('SET_GAME_LASTUPDATED', {gameId: gameId, lastUpdatedBy: snapshot.data().lastUpdatedBy})
            commit('SET_GAME_COUNT', {gameId: gameId, count: snapshot.data().count})
            if(snapshot.data().count > 9) {
              alert("Count > 9 resetting game to 0")
            }
          })
        },
        getUserFireStoreGames({commit}, user) { 
            let userGamesTempArray = []
            firebase.firestore().collection('users').doc(user.uid).collection('games').get()
            .then(resp => {
                resp.forEach(doc => {
                    let game = doc.data()
                        game.id = doc.id
                    userGamesTempArray.push(game)
                    console.log("user game: ", game)
                })
                commit('SET_USERGAMES', userGamesTempArray)
            })
            .catch(function(error) {
                console.log("Error getting user's games: ", error);
            })
        },
        getAllGames({commit}) { 
        let tempGamesArray = []
        firebase.firestore().collection('games')
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(doc => {
                    let game = doc.data()
                        game.id = doc.id
                    tempGamesArray.push(game)
                })
                commit('SET_GAMES', tempGamesArray)
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            })
        },
        joinOpenGame({commit}, payload) {
            firebase.firestore().collection('games').doc(payload.gameId).update({
                joiner: payload.joinUser,
                gameStatus: 'INPROGRESS',
                lastUpdatedBy: payload.joinUser
            })
            .then(game => {
                commit('SET_GAME_JOINER', payload)
            })
            .catch(error => console.log(error))
        }
    },
    getters: {
        games (state) {
            return state.games
        },
        getGameById: (state) => (gameId) => {
            return state.games.find(game => game.id === gameId)
        },
        gameById(state) {
          return (gameId) => {
            return state.games.find((game) => {
              return game.id === gameId
            })
          }
        },
        gamesOpen(state) {
            return state.games.filter(game => game.gameStatus === 'OPEN')
        },
        gamesInProgress(state) {
            return state.games.filter(game => game.gameStatus === 'INPROGRESS')
        },
    }
}

export default GameModule