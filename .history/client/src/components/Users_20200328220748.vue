<template>
   <v-list dark
            style="max-height: 550px; min-height: 50px"
            class="overflow-y-auto"
            v-repeat="tags">
            <v-list-item
              name="recur"
              v-for="place in locations"
              :key="place">
              <v-list-item-content>
                <v-list-item-title>
                  <v-container>
                    <v-text-field
                      type="text"
                      :key="place.id"
                      :readonly="(disabled + 1) % 2"
                      v-model="place.city">

                      <template v-slot:append-outer>

                          <v-btn
                            small
                            v-if="(disabled + 1) % 2"
                            color="primary"
                            :key="place.name"
                            @click="edit">
                            Edit
                          </v-btn>

                          <v-btn
                            small
                            v-if="disabled % 2"
                            color="success"
                            :key="place.id"
                            v-on:click="save()">
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
