<template>
  <div id="Users">
    <v-card dark class="mt-5">
      <v-card-title>
        Weather Reports
        <v-spacer></v-spacer>
        <v-text-field
          class="mr-8"
          v-model="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="afterResp"
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
      afterResp: null,
      error: null,
      arrdata: [],
      headers: ['id', 'city', 'createdAt', 'updatedAt'],
      search: ''
    }
  },
  components: {
    WeatherService
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
  },
  arrdata () {
    for (let i = 0; i < this.afterResp.length; i++) {
      console.log('heree')
      this.arrdata.push(this.afterResp[i])
      console.log('arrdata', this.arrdata)
    }
    return this.arrdata
  }
}
</script>

<style lang="css" scoped>
</style>
