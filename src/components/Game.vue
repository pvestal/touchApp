<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 >
                <h1>Who Touched</h1>
                <h3>Game: {{game.id}}</h3>
                <p v-if="user">Current User:{{user.displayName}}</p>
                <v-card dark color="primary">
                
                <p v-if="user">Creator: {{game.creator.displayName}}</p>
                <p v-if="game.joiner">Joiner: {{game.joiner.displayName}}</p>
                <p>Count State: {{game.count}}</p>
                <p v-if="user">Last Updated By: {{game.lastUpdatedBy.displayName}}</p>
                </v-card>
                
                <v-btn block color="primary" v-if="!visitor" :disabled="user.uid === game.lastUpdatedBy.uid" @click="increment" dark>TOUCH</v-btn>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
import format from 'date-fns/format'

    export default {
        props: ['id'],
        data: () => ({
            
        }),
        computed: {
            game() {
               return this.$store.getters.gameById(this.id)
            },
            user() {
                return this.$store.getters.user
            },
            visitor() {
                if(this.user.uid == this.game.creator.uid || this.user.uid == this.game.joiner.uid) {
                    return false
                } else {
                    return true
                }
            }
        },
        methods: {
            increment() {
                let gameObj = {
                    id: this.id,
                    count: this.game.count + 1,
                    lastUpdatedBy: {uid: this.user.uid, displayName: this.user.displayName},
                    updated: format(Date.now(), 'HH:mm:ss'),
                }
                this.$store.dispatch('incrementCount', gameObj)
            },
        },
        created() {
            this.$store.dispatch('firestoreListener', this.id)
        }
    }
</script>