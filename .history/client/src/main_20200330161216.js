// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { sync } from 'vuex-router-sync'
import store from './store/store'
import * as VueGoogleMaps from 'vue2-google-maps'

const vuetifyOptions = {}

Vue.config.productionTip = false
Vue.use(Vuetify, {
  iconfont: 'md'
})
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAE6ewOg7I56rrgSwdQUr0ymOUCynwA-sg',
    libraries: 'places'
  },
  installComponents: true
})

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  vuetify: new Vuetify(vuetifyOptions)
})
