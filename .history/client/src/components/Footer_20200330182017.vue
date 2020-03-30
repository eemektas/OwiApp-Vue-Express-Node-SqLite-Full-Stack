<template>
  <v-card flat class="mb-10">
    <v-footer dark>
      
    </v-footer>
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
