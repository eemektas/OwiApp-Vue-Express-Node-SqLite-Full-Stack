<template>
  <div id="Users">
    <v-list
      dark
      style="max-height: 550px; min-height: 50px"
      class="overflow-y-auto"
      v-repeat="tags">
      <v-list-item
        name="recur"
        v-for="data in afterResp"
        :key="data.weatherData">
        <v-list-item-content>
          <v-list-item-title>
            <v-container>
              <v-text-field
                type="text"
                :key="user.id"
                :readonly="readO"
                v-model="data">
              </v-text-field>
            </v-container>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import WeatherService from '@/services/WeatherService'
export default {

  name: 'Reports',

  data () {
    return {
      reps: {},
      afterResp: {},
      error: null
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      handler: async function () {
        this.resp = (await WeatherService.index(this.place)).data
        this.afterResp = JSON.parse(JSON.stringify(this.resp))
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
