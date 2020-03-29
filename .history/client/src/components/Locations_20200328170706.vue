<template>
  <div id="app">
    <v-layout>
      <v-flex xs10 mt-10>
        <br><br><br>
        <v-text-field
          dark
          placeholder="City"
          v-model="place.city"
          type="text"
          class="centered-input mt-3"
          @keypress.enter="login">
        </v-text-field>
        <div class="danger-alert" v-html="error"/>
        <v-btn color="success"
          class="mt-5 mb-10"
          @click="create()">
          Add
        </v-btn>
          <v-list dark
            style="max-height: 550px; min-height: 50px"
            class="overflow-y-auto"
            v-repeat="tags">
            <v-list-item
              name="recur"
              v-for="place in locations"
              :key="place">
              <v-list-item-content>
                <v-list-item-title mt-5>
                                  <v-text-field
                                    class="ma-1 "
                                    type="text"
                                    :key="place.id"
                                    :disabled="disabled % 2 == 0"
                                    v-model="place.city">

                                    <template v-slot:append>

                                        <v-btn
                                          medium
                                          v-if="(disabled + 1) % 2"
                                          color="primary"
                                          class="ma-0"
                                          @click="edit"
                                          :key="place.name">
                                          Edit
                                        </v-btn>

                                        <v-btn
                                          medium
                                          v-if="disabled % 2"
                                          small
                                          color="success"
                                          :key="place.id"
                                          v-on:click="save()">
                                          Save
                                        </v-btn>

                                        <v-btn
                                          medium
                                          color="error"
                                          class="ma-0"
                                          @click="del()">
                                          Delete
                                        </v-btn>
                                      
                                    </template>
                                      
                                  </v-text-field>
                      
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import LocationService from '@/services/LocationService'
export default {
  name: 'Locations',
  data () {
    return {
      locations: {},
      place: {
        id: null,
        city: null
      },
      disabled: 0,
      error: null
    }
  },
  components: {
    LocationService
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      handler: async function () {
        this.locations = (await LocationService.index()).data
      }
    }
  },
  methods: {
    async create () {
      try {
        if (this.place.city === null ||
            this.place.city[0] === ' ' ||
            this.place.lenght === 0) {
          alert('Please provide a valid city name')
          return
        } else {
          await LocationService.post(this.place)
          this.locations = (await LocationService.index()).data
          this.error = null
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async edit () {
      this.disabled += 1
    },
    async save () {
      this.disabled += 1
    },
    async del () {
      try {
        await LocationService.del(this.place)
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
