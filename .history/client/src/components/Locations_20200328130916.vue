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
          class="centered-input mt-3">
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
                  <template>
                    <v-text-field
                      class="ml-3"
                      type="text"
                      :key="place.id"
                      :disabled="disabled % 2 == 0"
                      v-model="place.city">
                    </v-text-field>
                  <v-layout row wrap justify-end>
                    <v-flex shrink>
                      <v-btn
                        v-if="disabled % 2"
                        small
                        color="success"
                        :key="place.id"
                        v-on:click="save()">
                        Save
                      </v-btn>
                      <v-btn
                        v-if="(disabled + 1) % 2"
                        small
                        color="primary"
                        :key="place.id"
                        v-on:click="edit()">
                        Edit
                      </v-btn>
                      <v-btn
                        small
                        color="error mr-5"
                        :key="place.id"
                        @click="del()">
                        Delete
                      </v-btn>
                    </v-flex>
                  </v-layout>
                  </template>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
      </v-flex>
    </v-layout>
  </div>
    <v-card max-width="500" class="mx-auto">
      <v-toolbar color="indigo" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Inbox</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" @click="">
          <v-list-item-icon>
            <v-icon v-if="item.icon" color="pink">mdi-star</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>
        </v-list-item>
      </v-list>
    </v-card>
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
