<template>
    <div>
    <p>Letter: {{letter}} / Last Move: {{square}} / Clicks: {{clickCounter}}</p>
    
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex v-for="i in 9" :key="'4${i}'" xs4>
                <v-card dark color="primary" v-model="square" @click="set(i) ">
                  <v-card-text class="px-0">{{i}}</v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
      </v-container>
        <h1>Game List</h1>
        <v-btn :disabled="!isAuthenticated" @click.prevent="createGame">Create</v-btn>
        <ul>
            <li v-for="game in games">
                Game: {{game.key}} - <v-btn>Join</v-btn>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data: () => ({
            square: null,
            inProgress: true,
            turnCounter: 0,
            clickCounter: 1,
            turn: true,
            letter: '',
            loading: false
        }),
        computed: {
          user() {
            return this.$store.getters.user
          },
          games() {
              return this.$store.getters.games
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
            set(marker) {
                this.square = marker
                this.updateCounter()
            },
            updateCounter() {
                this.turnCounter += 1
                this.clickCounter += 1
                if (this.clickCounter % 2) {
                    this.letter = "X"
                } else {
                    this.letter = "O"
                }
                if (this.clickCounter >= 2) {
                // clickCounter being >=2 means child_added was triggered at least twice.
                // since we stop the user from sending data to the server more than once at a time,
                //this implies the other player sent the other piece of data and triggered child_added for the second time.
                this.turn = true
                
                    } else {
                        this.turn = false;
                    }
            },
            createGame() {
                console.log("trying to create game")
                this.$store.dispatch('createGame')
            }
        },
        created() {
            this.loading = true
            this.$store.dispatch('loadGames')
            .then(() => this.loading = false)
        }
    }
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>