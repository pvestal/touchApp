<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Game />
    <Chat/>
  </div>
</template>

<script>
import Chat from './components/Chat.vue'
import Game from './components/GameBoard.vue'
import 'vuetify/dist/vuetify.min.css'

export default {
  name: 'app',
  components: {
    Chat,
    Game
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
