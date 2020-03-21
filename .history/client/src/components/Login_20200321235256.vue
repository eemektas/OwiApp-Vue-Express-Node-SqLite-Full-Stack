<template>
  <v-container
    mt-10
    class="fill-height"
    fluid>
    <v-layout column mt-10>
      <br>
      <h1>Login</h1>
      <div class="text-xs-center">
        <v-flex xs6 offset-xs3>
            <v-form
              ref="form"
              name="owi-form"
              autocomplete="off">
              <v-text-field
                dark
                class="mt-10"
                label="Username"
                v-model="username">
              </v-text-field>
              <v-text-field
                dark
                label="Password"
                type="password"
                v-model="password"
                autocomplete="new-password">
              </v-text-field>
            </v-form>
            <div class="danger-alert" v-html="error" />
            <v-btn
              dark
              x-large
              class="dark mt-10"
              @click="login"
              >
              Login
            </v-btn>
        </v-flex>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthService.login({
          username: this.username,
          password: this.password
        })
        const token = response.data.token
        console.log(token)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        if (this.$store.state.isUserLoggedIn) {
          this.$route.go('Weather')
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}

h1 {
  color: white;
}
</style>
