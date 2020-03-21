import Vue from 'vue'
import Router from 'vue-router'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import Weather from './components/Weather.vue'
import Locations from './components/Locations.vue'
import Users from './components/Users.vue'
import Reports from './components/Reports.vue'
import Error from './components/404.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      component: Register,
      name: 'Register'
    },
    {
      path: '/login',
      component: Login,
      name: 'Login'
    },
    {
      path: '/weather',
      component: Weather,
      name: 'Weather'
    },
    {
      path: '/locations',
      component: Locations,
      name: 'Locations'
    },
    {
      path: '/users',
      component: Users,
      name: 'Users'
    },
    {
      path: '/reports',
      component: Reports,
      name: 'Reports'
    },
    {
      path: '*' || '/#' || '/' || '/#/',
      redirect: 'Login'
    },
    {
      path: '/404',
      component: Error,
      name: '404'
    }
  ]
})
