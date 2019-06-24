<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vue+Vuetify+Firebase</span>
        <v-spacer></v-spacer>
        <span class="font-weight-light">TURNBASED APP</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>

    <v-content>
      <v-container>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/games">Games</router-link>
    </v-container>
    <router-view/>
    </v-content>
  </v-app>
</template>
