import firebase from 'firebase/app'
import 'firebase/database'
import format from 'date-fns/format'


const GameModule = {
    state: {
        games: []
    },
    mutations: {
        PUSH_GAME(state, payload) {
            state.games.push(payload)
        },
        SET_GAMES(state, payload) {
            state.games = payload
        }
    },
    actions: {
        createGame({commit, getters}, payload) {
        const user = getters.user
        const gameKey = firebase.database().ref().child('games').push().key
        const updates = {}
        const game = {
            creator: user.uid,
            created: format(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
        }
        updates['/games/' + gameKey] = game
        return firebase.database().ref().update(updates)
          .then(() => {
            console.log("game created", gameKey)
            commit('SET_LOADING', false)
            commit('PUSH_GAME', game)
          })
          .catch(error => {
            console.log(error)
            commit('SET_LOADING', false)
          })
        },
        loadGames ({commit}) {
          const gameRef = firebase.database().ref('games')
          gameRef.once('value', snapshot => {
            let tempGamesArray = []
            snapshot.forEach((doc) => {
            let game = doc.val()
                game.key = doc.key
                tempGamesArray.push(game)
            })
            commit('SET_GAMES', tempGamesArray)
          })
          .catch(error => console.log(error))
        },
    },
    getters: {
        games (state) {
            return state.games
        },
        gameById(state) {
            return (gameId) => {
                return state.games.find((game) => {
                    return game.id === gameId
                })
            }
        }
    }
}

export default GameModule