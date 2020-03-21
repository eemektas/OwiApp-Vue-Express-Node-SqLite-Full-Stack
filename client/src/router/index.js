import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Weather from '@/components/Weather'
import Locations from '@/components/Locations'
import Users from '@/components/Users'
import Reports from '@/components/Reports'
import Wrong from '@/components/Wrong'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/weather',
      name: 'Weather',
      component: Weather
    },
    {
      path: '/locations',
      name: 'Locations',
      component: Locations
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports
    },
    {
      path: '/wrong',
      name: 'wrong',
      component: Wrong
    },
    {
      path: '*',
      redirect: 'wrong'
    }
  ]
})
