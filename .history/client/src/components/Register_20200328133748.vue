<template>
  <v-container
    mt-10
    class="fill-height"
    fluid>
    <v-layout column mt-10>
      <br>
      <h1>Register</h1>
      <div class="text-xs-center">
        <v-flex xs6 offset-xs3>
          <v-expansion-panel>
            <v-form
              ref="form"
              name="owi-form">
              <v-text-field class="mt-10"
                dark
                label="Username"
                v-model="username"
                @keypress.enter="login"
                autocomplete="true">
              </v-text-field>
              <v-text-field
                dark
                label="Password"
                type="password"
                v-model="password"
                @keypress.enter="register"
                autocomplete="new-password">
              </v-text-field>
            </v-form>
            <div class="danger-alert" v-html="error" />
            <v-btn
              dark
              x-large
              class="dark mt-10"
              @click="register">
              Register
            </v-btn>
          </v-expansion-panel>
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
    async register () {
      try {
        const response = await AuthService.register({
          username: this.username,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push('Login')
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
