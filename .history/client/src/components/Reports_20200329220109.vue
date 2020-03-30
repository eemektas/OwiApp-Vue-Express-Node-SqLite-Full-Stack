<template>
  <div>
  </div>
</template>

<script>
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
        this.locations = (await LocationService.index()).data
        this.cities = JSON.parse(JSON.stringify(this.locations))
      }
    }
  },
}
</script>

<style lang="css" scoped>
</style>
