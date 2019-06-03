<template>
    <div>
    <v-btn :disabled="isAuthenticated" @click="googleSignIn">Signin w/Google</v-btn>
    <!--Display Number of Users Online-->
    <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>supervisor_account</v-icon>
          </v-list-tile-action>
          <v-list-tile-content class="blue--text">
             <!--numChildren is 0 in vuex onlineUsers array-->
            Online Users {{onlineUsers[0]}}
          </v-list-tile-content>
        </v-list-tile>
    </v-list>
    <!--Display List of Users Online-->
    <v-list>
        <v-list-tile avatar v-for="authUser in onlineUsers[1]" :key="authUser.key">
            <v-list-tile-avatar>
                <img v-if="!user" src="https://randomuser.me/api/portraits/lego/1.jpg" />
                <img v-else="user" :src="authUser.user.photoURL" />
            </v-list-tile-avatar>
            <v-list-tile-content>
                <!--google auth returns user obj then user details-->
                <v-list-tile-title class="blue--text">{{authUser.user.displayName}}</v-list-tile-title>
                <v-list-tile-action>
                  <div>
                    <v-dialog v-model="dialog" width="500">
                      <template v-slot:activator="{ on }">
                        <v-btn small v-on="on">
                          <v-icon>message</v-icon>
                        </v-btn>
                      </template>
  
                      <v-card>
                        <!--<v-card-title class="headline grey lighten-2" primary-title>-->
                        <!--  Message or Game Invite-->
                        <!--</v-card-title>-->
                        <v-card-text>
                          
                          <v-text-field label="Send Message" v-model="userMessage"></v-text-field>
                          <small class="grey--text">* This doesn't actually send.</small>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" flat @click="dialog = false">
                            Send
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!--<v-btn small @click="dialog = !dialog">-->
                    <!--  <v-icon>message</v-icon>-->
                    <!--</v-btn>-->
                    <v-btn small @click="playGame">
                      <v-icon>videogame_asset</v-icon>
                    </v-btn>
                  </div>
                </v-list-tile-action>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        // user: null,
        dialog: false,
        userMessage: null
      }
    },
    computed: {
      user() {
        return this.$store.getters.user
      },
      onlineUsers() {
        return this.$store.getters.onlineUsers
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
      playGame() {
        alert("Coming Soon")
      }
    }
  }
</script>
