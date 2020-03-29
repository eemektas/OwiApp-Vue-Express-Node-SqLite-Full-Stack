<template>
  
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  name: 'Users',
  data () {
    return {
      users: {
        username: null
      }
    }
  },
  components: {
    AuthService
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      handler: async function () {
        this.users = (await AuthService.index()).data
        console.log('users', this.users)
      }
    }
  },
  methods: {
    async create () {
      try {
        await AuthService.register(this.user)
        this.users = (await AuthService.index()).data
        this.error = null
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }

}
</script>

<style lang="css" scoped>
.centered-input >>> input{
  text-align: center
}
</style>
