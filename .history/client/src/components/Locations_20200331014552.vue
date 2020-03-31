<template>
  <div id="app">
    <v-layout justify-center>
      <v-flex xs10>
        <br><br>
        <v-text-field
          dark
          placeholder="City"
          v-model="place.city"
          type="text"
          class="centered-input"
          @keypress.enter="create">
        </v-text-field>
        <div class="danger-alert" v-html="error"/>
        <v-btn color="success"
          class="mt-5 mb-10"
          @click="create">
          Add
        </v-btn>
          <v-list dark
            style="max-height: 550px; min-height: 50px"
            class="overflow-y-auto">
            <v-list-item
              name="recur"
              v-for="(place, i) in locations"
              :key="i">
              <v-list-item-content>
                <v-list-item-title>
                  <v-container>
                    <v-text-field
                      type="text"
                      v-bind:key="place.city"
                      :readonly="readO"
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
                            @click="save">
                            Save
                          </v-btn>

                          <v-btn
                            small
                            color="error"
                            value="city"
                            :key="i"
                            @click="del(place)">
                            Delete
                          </v-btn>
                      </template>
                    </v-text-field>
                  </v-container>
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
      readO: true,
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
        console.log('locs', this.locations)
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
      this.readO = false
    },
    async save () {
      this.disabled += 1
      this.readO = true
    },
    async del (city) {
      try {
        console.log('here', place)
        await LocationService.remove(place)
        this.locations = (await LocationService.index()).data
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
