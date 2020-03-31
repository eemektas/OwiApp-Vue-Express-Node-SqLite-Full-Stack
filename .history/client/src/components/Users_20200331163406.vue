<template>
<div id="Users">
   <v-list dark
    style="max-height: 550px; min-height: 50px"
    class="overflow-y-auto">
    <v-list-item
      name="recur"
      v-for="(user, i) in users"
      :key="user">
      <v-list-item-content>
        <v-list-item-title>
          <v-container>
            <v-text-field
              type="text"
              :key="user.id"
              :readonly="readO"
              v-model="user.username">
              <template v-slot:append>

                <v-btn
                  small
                  v-if="(disabled + 1) % 2"
                  color="primary"
                  :key="user.id"
                  @click="edit">
                  Edit
                </v-btn>

                <v-btn
                  small
                  v-if="disabled % 2"
                  color="success"
                  :key="user.id"
                  @click="save(user)">
                  Save
                </v-btn>

                <v-btn
                  small
                  value="id"
                  color="error"
                  :key="i"
                  @click="del(user)">
                  Delete
                </v-btn>
              </template>
            </v-text-field>
          </v-container>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</div>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  name: 'Users',
  data () {
    return {
      users: {},
      error: null,
      disabled: 0,
      readO: true
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
    },
    async edit () {
      this.disabled += 1
      this.readO = false
    },
    async save (user) {
      try {
        await AuthService.put(user)
        this.locations = (await AuthService.index()).data
        this.disabled += 1
        this.readO = true
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    async del (user) {
      try {
        await AuthService.delete(user.id)
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
