<template>
<div id="Users">
  <v-layout xs1>
  <v-text-field
    dark
    placeholder="City"
    v-model="place.city"
    type="text"
    class="centered-input"
    @keypress.enter="create">
  </v-text-field>
  <v-text-field
    dark
    placeholder="City"
    v-model="place.city"
    type="text"
    class="centered-input"
    @keypress.enter="create">
  </v-text-field>
  </v-layout>
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
                  @click="save">
                  Save
                </v-btn>

                <v-btn
                  small
                  color="error"
                  @click="del">
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
    }
    // edit () {
    //   try {

    //   } catch {

    //   }
    // }
  }

}
</script>

<style lang="css" scoped>
.centered-input >>> input{
  text-align: center
}
</style>
