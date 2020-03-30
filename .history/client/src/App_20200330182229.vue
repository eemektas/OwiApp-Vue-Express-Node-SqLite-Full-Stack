<template>
  <div id="app" >
    <v-app fixed class="bg-no-repeat cover bg-white hero relative"
      :style="{ backgroundImage: `url(${backgroundUrl})` }">
        <page-header />
        <main>
          <v-container>
            <router-view></router-view>
          </v-container>
        </main>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
import PageFooter from '@/components/Footer.vue'
import backgroundUrl from '@/assets/sky.jpg'
export default {
  name: 'app',
  components: {
    PageHeader
  },
  data () {
    return {
      backgroundUrl
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.danger-alert {
  color: red;
}

.error {
  color: red;
}

h1 {
  color: white;
}
</style>
