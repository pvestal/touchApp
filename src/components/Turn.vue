<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs12 >
                <h1>Who Touched</h1>
                <v-card dark color="primary">
                
                <p v-if="currentUser">Your UID:{{currentUser.uid}}</p>
                <p v-if="countState!= undefined">Count State: {{countState}}</p>
                <p v-if="currentUser">Last Updated By: {{lastUpdatedBy}}</p>
                </v-card>
                
                <v-btn block color="primary" v-if="currentUser" :disabled="currentUser.uid == lastUpdatedBy" @click="increment" dark>TOUCH</v-btn>
                <v-btn block color="primary" :disabled="isAuthenticated" @click="googleSignIn" dark>GOOGLE SIGNIN</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12>
                <h1>Games</h1>
                <v-btn block color="primary" v-if="isAuthenticated" @click="createGame" dark>CREATE GAME</v-btn>
            </v-flex>
            <v-flex xs12>
                <h3>My Open Games</h3>
                <v-card dark color="primary" v-for="game in myOpenGames" :key="game.id">
                <div>Creator: {{game.creator.displayName}} Id: {{game.id}}</div>
                </v-card>
            </v-flex>
            <v-flex xs12>
                <h3>Games You Can Join</h3>
                <v-card dark color="primary" v-for="game in gamesOpen" :key="game.id">
                <div>Creator: {{game.creator.displayName}} Id: {{game.id}}</div>
                <v-btn v-if="isAuthenticated && gamesJoinable" @click="joinGame(game.id)">JOIN GAME</v-btn>
                </v-card>
            </v-flex>
            <v-flex xs12>
                <h3>Games in Progress</h3>
                <v-card class="pb-3 ma-2" dark color="primary" v-for="game in gamesInProgress" :key="game.id">
                <div>Creator: {{game.creator.displayName}} Id: {{game.id}}</div>
                <div>Joiner: {{game.joiner.displayName}}</div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
import format from 'date-fns/format'

    export default {
        data: () => ({

        }),
        computed: {
            gamesOpen() {
              return this.$store.getters.gamesOpen 
            },
            myOpenGames() {
              return this.$store.getters.gamesOpen.filter(game => game.creator.uid === this.currentUser.uid)
            },
            gamesJoinable() {
              return this.$store.getters.gamesOpen.filter(game => game.creator.uid !== this.currentUser.uid)
            },
            gamesInProgress() {
              return this.$store.getters.gamesInProgress
            },
            games() {
              return this.$store.getters.games  
            },
            countState () {
                return this.$store.getters.count
            },
            lastUpdatedBy () {
                return this.$store.getters.lastUpdatedBy
            },
            currentUser() {
                return this.$store.getters.user
            },
            // isMyGame() {
            //     return this.games.creator.uid === this.currentUser.uid
            // },
            isAuthenticated () {
                if (this.currentUser == undefined || this.currentUser == null) {
                  return false;
                } else {
                  return true;
                }
            }
        },
        methods: {
            increment() {
                let myObj = {
                    count: this.countState + 1,
                    currentUser: this.currentUser.uid,
                    updated: format(Date.now(), 'HH:mm:ss'),
                }
                this.$store.dispatch('incrementCount', myObj)
            },
            googleSignIn() {
                this.$store.dispatch('googleSignIn')
            },
            createGame() {
                this.$store.dispatch('createGame', this.currentUser)
            },
            joinGame(id) {
                let payload = {
                    user: this.currentUser,
                    id
                }
                this.$store.dispatch('joinOpenGame', payload)
            }
        },
        created() {
            this.$store.dispatch('firestoreListener')
            this.$store.dispatch('getOpenGamesListener')
        }
    }
</script>