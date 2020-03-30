<template>
  <div id="Footer">
    <v-card>
      <v-footer
        dark
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
          ><v-icon>fab fa-github</v-icon>
            {{ link }}
          </v-btn>
          <v-col
            class="text-center white--text"
            cols="11"
          >
            <strong>OWI</strong> - {{ new Date().getFullYear() }}
            <br>
            Made with <i class="fas fa-heart" color="red"></i>
            and <i class="fab fa-vuejs" color="green"></i>
          </v-col>
        </v-row>
      </v-footer>
    </v-card>
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
