<template>
  <div>
  </div>
</template>

<script>
import WeatherService from '@/services/WeatherService'
export default {

  name: 'Reports',

  data () {
    return {

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
  },
}
</script>

<style lang="css" scoped>
</style>
