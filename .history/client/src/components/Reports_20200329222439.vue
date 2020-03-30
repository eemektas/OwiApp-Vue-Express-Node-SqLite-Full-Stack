<template>
  <div id="Users">
    <v-card dark class="mt-5">
      <v-card-title>
        Reports
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
      ></v-data-table>
    </v-card>
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
        this.resp = (await WeatherService.index()).data
        this.afterResp = JSON.parse(JSON.stringify(this.resp))
        console.log('data', this.afterResp)
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
