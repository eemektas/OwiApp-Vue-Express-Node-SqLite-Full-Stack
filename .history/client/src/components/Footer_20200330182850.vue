<template>
  <div id="Footer">
    <v-footer
      color="black"
      padless
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-btn
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
        <v-col
          class="primary lighten-2 py-4 text-center white--text"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>OWI</strong>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>
