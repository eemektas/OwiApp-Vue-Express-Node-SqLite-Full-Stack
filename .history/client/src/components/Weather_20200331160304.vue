<template>
  <div id="selector">
    <div>
      <v-layout dark row wrap class="mx-auto">
        <v-flex dark mx-auto xs10>
          <v-select
            dark
            :items="cities"
            v-model="place.city"
            v-on:change="sendPlace"
            label="Select City"
            single-line
            item-text="city"
            item-value="city"
          ></v-select>
        </v-flex>
      </v-layout>
    </div>
    <div class="danger-alert" v-html="error"/>
    <div v-if="JSON.parse(JSON.stringify(this.place.city))">
      <v-card
        dark
        class="mx-auto mt-5"
        max-width="600"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline">{{weatherData.name}}</v-list-item-title>
            <v-list-item-subtitle>{{Date(weatherData.dt * 1000)}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text >
          <v-row align="center">
            <v-col class="display-2" cols="12">
              {{weatherData.main.temp}}&deg;C
            </v-col>
          </v-row>
        </v-card-text>

        <v-list-item>
          <v-list-item-subtitle>Wind: <b>{{weatherData.wind.speed}}</b> km/s</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-subtitle>Humidity: <b>{{weatherData.main.humidity}}</b> %</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-subtitle>Sunrise@{{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-GB").slice(0,5)}}</v-list-item-subtitle>
          <v-list-item-subtitle>Sunset@{{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-GB").slice(0,5)}}</v-list-item-subtitle>
        </v-list-item>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text disabled><v-icon>fas fa-cloud</v-icon>by OpenWeatherMap</v-btn>
        </v-card-actions>
      </v-card>
      <div>
        <v-layout row wrap justify-center mt-5>
          <GmapMap
          style="width: 100px; height: 350px;"
          :zoom="7"
          :center="{lat: weatherData.coord.lat, lng: weatherData.coord.lon}">
            <GmapMarker v-for="(marker, index) in markers"
              :key="index"
              :position="marker.position"
              />
            <GmapMarker
              v-if="this.place"
              label="★"
              :position="{
                lat: weatherData.coord.lat,
                lng: weatherData.coord.lon,
              }"
              />
        </GmapMap>
        </v-layout>
      </div>
    </div>
  </div>
</template>

<script>
import LocationService from '@/services/LocationService'
import WeatherService from '@/services/WeatherService'

export default {
  name: 'Weather',
  data () {
    return {
      locations: {},
      place: {
        id: null,
        city: null
      },
      resp: null,
      afterResp: {},
      cities: [],
      markers: [],
      weatherData: {},
      error: null
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      handler: async function () {
        this.locations = (await LocationService.index()).data
        this.cities = JSON.parse(JSON.stringify(this.locations))
      }
    }
  },
  components: {
    WeatherService,
    LocationService
  },
  methods: {
    async sendPlace () {
      try {
        await WeatherService.post(this.place)
        this.resp = (await WeatherService.index()).data
        this.afterResp = JSON.parse(JSON.stringify(this.resp))
        this.weatherData = JSON.parse(this.afterResp[0].weatherData)
        this.markers.push({
          position: {
            lat: this.weatherData.coord.lat,
            lng: this.weatherData.coord.lon
          }
        })
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}
</script>
<style lang="css" scoped>
#selector {
  max-width: 600px;
  margin: auto;
}
</style>
