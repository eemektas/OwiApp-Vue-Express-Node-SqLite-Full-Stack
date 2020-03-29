<template>
   <v-list dark
    style="max-height: 550px; min-height: 50px"
    class="overflow-y-auto"
    v-repeat="tags">
    <v-list-item
      name="recur"
      v-for="user in users"
      :key="user">
      <v-list-item-content>
        <v-list-item-title>
          <v-container>
            <v-text-field
              type="text"
              :key="place.id"
              :readonly="(disabled + 1) % 2"
              v-model="user.username">

              
            </v-text-field>
          </v-container>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  name: 'Users',
  data () {
    return {
      users: {
        username: null
      },
      error: null
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
