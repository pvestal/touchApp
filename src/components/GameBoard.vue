<template>
    <div>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex v-for="i in 9" :key="'4${i}'" xs4>
                <v-card dark color="primary" v-model="square" @click="set(i)">
                  <v-card-text class="px-0">{{i}}</v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                square: null,
                inProgress: true,
                currentPlayerTurn: '0'
            }
        },
        methods: {
            set(marker) {
                console.log(marker)
                this.square = marker
            }
        }
    }
</script>
