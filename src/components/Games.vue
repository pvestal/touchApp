<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs12 >
                <p v-if="isAuthenticated">Welcome {{user.displayName}}</p>
                <v-btn block color="primary" :disabled="isAuthenticated" @click="googleSignIn" dark>GOOGLE SIGNIN</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12>
                <h1>Games</h1>
                <v-btn block color="primary" v-if="isAuthenticated" :disabled="madeGame" @click="createGame()" dark>CREATE GAME</v-btn>
            </v-flex>
            <v-flex xs12>
                <h3>All Games: [{{games.length}}]</h3>
                <v-card class="ma-2" dark color="primary" v-for="game in games" :key="game.id">
                <div>Id: {{game.id}} Created: {{game.created}} Status: {{game.gameStatus}}</div>
                </v-card>
            </v-flex>
            <v-flex xs12 v-if="isAuthenticated">
                <h3>My Created Games: [{{myGames.length}}]</h3>
                <v-card class="ma-2" dark color="primary" v-for="game in myGames" :key="game.id">
                <div>Id: {{game.id}} Created: {{game.created}} Status: {{game.gameStatus}}</div>
                <v-btn small v-if="isAuthenticated" :to="'/game/' + game.id">OPEN GAME</v-btn>
                </v-card>
            </v-flex>
            <v-flex xs12>
                <h3>Games Open: [{{gamesOpen.length}}]</h3>
                <v-card class="ma-2" dark color="primary" v-for="game in gamesOpen" :key="game.id">
                <div>Creator: {{game.creator.displayName}} Id: {{game.id}}</div>
                <v-btn small v-if="isAuthenticated" @click="joinGame(game.id)">JOIN GAME</v-btn>
                </v-card>
            </v-flex>
            
            <v-flex xs12>
                <h3>Games in Progress: [{{gamesInProgress.length}}]</h3>
                <v-card class="ma-2" dark color="primary" v-for="game in gamesInProgress" :key="game.id">
                <div>Creator: {{game.creator.displayName}} Id: {{game.id}}</div>
                <div>Joiner: {{game.joiner.displayName}}</div>
                <div>Count: {{game.count}}</div>
                <v-btn small v-if="isAuthenticated" :to="'/game/' + game.id">OPEN GAME</v-btn>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>

    export default {
        data: () => ({
            madeGame: false
        }),
        computed: {
            gamesOpen() {
                return this.$store.getters.gamesOpen 
            },
            myGames() {
              return this.$store.getters.getUserGames 
            },
            games() {
                return this.$store.getters.games
            },
            gamesInProgress() {
                return this.$store.getters.gamesInProgress
            },
            user() {
                return this.$store.getters.user
            },
            isAuthenticated () {
                if (this.user == undefined || this.user == null) {
                  return false;
                } else {
                  return true;
                }
            }
        },
        methods: {
            googleSignIn() {
                this.$store.dispatch('googleSignIn')
            },
            createGame() {
                if(this.$store.getters.getUserGames.length > 3) {
                    alert("Currently users cannot have more than 3 games with the free account. \n Please upgrade to create more games. ")
                    return false
                } else {
                    let userObj = {
                        uid: this.user.uid,
                        displayName: this.user.displayName
                    }
                    this.$store.dispatch('createGame', userObj)
                    this.madeGame = true
                }
            },
            joinGame(gameId) {
                let thaGame = this.$store.getters.getGameById(gameId)
                
                if(this.user.uid == thaGame.creator.uid) {
                    alert("Sorry you can't join a game you created.")
                    return false
                } else {
                    let joinObj = {
                        gameId: gameId,
                        joinUser: {uid: this.user.uid, displayName: this.user.displayName}
                    }
                    this.$store.dispatch('joinOpenGame', joinObj)
                    this.$router.push('/game/' + gameId)
                }
            }
        },
        created() {
            this.$store.dispatch('getAllGames')
        }
    }
</script>