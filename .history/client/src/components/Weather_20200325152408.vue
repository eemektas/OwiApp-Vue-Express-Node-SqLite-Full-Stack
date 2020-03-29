<template>
  <div id="selector">
    <div>
      <v-layout dark row wrap class="mx-auto mt-10">
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
    <div v-if="JSON.parse(JSON.stringify(this.place.city))">
      <v-card
        dark
        class="mx-auto mt-12"
        max-width="500"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline">{{name}}</v-list-item-title>
            <v-list-item-subtitle>{{time}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text v-if="name">
          <v-row align="center">
            <v-col class="display-2" cols="12">
              {{currentTemp}}&deg;C
            </v-col>
          </v-row>
        </v-card-text>

        <v-list-item>
          <v-list-item-subtitle>Wind: {{wind}}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-subtitle>Humidity: {{humidity}}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <!-- <v-list-item-icon>
            <v-icon ><i class="fas fa-sunset"></i></v-icon>
          </v-list-item-icon> -->
          <v-list-item-subtitle>Sunrise@{{sunrise}}</v-list-item-subtitle>
          <v-list-item-subtitle>Sunset@{{sunset}}</v-list-item-subtitle>
        </v-list-item>

        <v-list class="transparent">
          <v-list-item
            v-for="item in forecast"
            :key="item.day"
          >
            <v-list-item-title>{{ item.day }}</v-list-item-title>

            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-subtitle class="text-right">
              {{ item.temp }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text disabled>by OpenWeatherMap</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import LocationService from '@/services/LocationService'
import WeatherService from '@/services/WeatherService'
export default {
  name: 'Weather',
  data () {
    return {
      locations: {},
      place: {
        city: ''
      },
      resp: null,
      cities: [],
      error: null,
      currentTemp: '',
      feelsLike : '',
      minTemp: '',
      maxTemp:'',
      sunrise: '',
      sunset: '',
      pressure: '',
      humidity: '',
      wind: '',
      overcast: '',
      name: '',
      time: ''
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      handler: async function () {
        this.locations = (await LocationService.index()).data
        this.cities = JSON.parse(JSON.stringify(this.locations))
        this.weatherService = (await WeatherService.post(this.place.city)).data
        console.log('json', this.weatherService)
      }
    }
  },
  components: {
    WeatherService
  },

  //   async sendPlace () {
  //     try {
  //       await WeatherService.post(this.place)
  //       console.log(this.place)
  //       this.error = null
  //       let url = await `http://api.openweathermap.org/data/2.5/weather?q=${JSON.parse(JSON.stringify(this.place.city))}&units=metric&APPID=bd091ec8d79ff89eba0e2ab15f980531`
  //       axios
  //         .get(url)
  //         .then(response => {
  //           this.currentTemp = response.data.main.temp
  //           this.feelsLike = response.data.main.feels_like
  //           this.minTemp = response.data.main.temp_min
  //           this.maxTemp = response.data.main.temp_max
  //           this.pressure = response.data.main.pressure
  //           this.humidity = response.data.main.humidity + '%'
  //           this.wind = response.data.wind.speed + 'km/s'
  //           this.overcast = response.data.weather[0].description
  //           this.sunrise = new Date(response.data.sys.sunrise * 1000).toLocaleTimeString("en-GB").slice(0,5)
  //           this.sunset = new Date(response.data.sys.sunset * 1000).toLocaleTimeString("en-GB").slice(0,5)
  //           this.name = response.data.name
  //           this.time = Date(response.data.dt * 1000)
  //         })
  //     } catch (error) {
  //       this.error = error.response.data.error
  //       console.log(this.error)
  //     } finally {
  //       this.$forceUpdate()
  //       this.render += 1
  //     }
  //   }
  // },
  beforeMount () {
    this.sendPlace()
  }
}
</script>
<style lang="css" scoped>
#selector {
  max-width: 600px;
  margin: auto;
}
</style>
