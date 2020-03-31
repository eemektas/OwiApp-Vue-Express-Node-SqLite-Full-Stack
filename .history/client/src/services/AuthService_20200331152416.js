import Api from '@/services/Api'

export default {
  index () {
    return Api().get('users')
  },
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  delete (userId) {
    return Api().delete(`users/${userId}`)
  }
}

// Auth.register({
//   username: 'root',
//   password: 'root'
// })
