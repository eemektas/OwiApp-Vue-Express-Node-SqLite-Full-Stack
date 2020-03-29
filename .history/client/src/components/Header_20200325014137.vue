<template>
  <v-card flat class="mb-10">
    <v-toolbar dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-toolbar-title class="home disabled display-1 mr-5"
        tag="span"
        :to="{
          name: 'Weather'
        }">
        OWI
      </v-toolbar-title>

      <v-btn
        v-if="$store.state.isUserLoggedIn"
        text
        dark
        :to="{
          name: 'Weather'
        }">
        Weather
      </v-btn>

      <v-btn
        v-if="$store.state.isUserLoggedIn && $store.state.user.username === 'root'"
        text
        dark
        :to="{
          name: 'Locations'
        }">
        Locations
      </v-btn>

      <v-btn
        v-if="$store.state.isUserLoggedIn && $store.state.user.username === 'root'"
        text
        dark
        :to="{
          name: 'Users'
        }">
        Users
      </v-btn>

      <v-btn
        v-if="$store.state.isUserLoggedIn"
        text
        dark
        :to="{
          name: 'Reports'
        }">
        Reports
      </v-btn>

    <v-spacer></v-spacer>

      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        text
        dark
        :to="{
          name: 'Login'
        }">
        Login
      </v-btn>

      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        text
        dark
        :to="{
          name: 'Register'
        }">
        Register
      </v-btn>

      <v-btn
        v-if="$store.state.isUserLoggedIn"
        text
        dark
        @click="logout"
        :to="{
          name: 'Register'
        }">
        Log Out
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>

<style scoped>

</style>
