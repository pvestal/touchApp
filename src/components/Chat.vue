<template>
    <div>
    <button @click="googleSignIn">Signin w/Google</button>
        <p v-if="user">{{user}}</p>
    </div>
</template>

<script>
    export default {
      data() {
        user: null
      },
      computed: {
        user() {
          return this.$store.getters.user
        }
      },
      methods: {
        googleSignIn() {
          this.$store.dispatch('googleSignIn')
        }
      }
    }
</script>
