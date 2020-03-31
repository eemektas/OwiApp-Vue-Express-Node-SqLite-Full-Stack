import Api from '@/services/Api'

export default {
  index () {
    return Api().get('locations')
  },
  post (city) {
    return Api().post('locations', city)
  },
  put (city) {
    return Api().put('locations', city)
  },
  delete (city) {
    return Api().delete('locations', city)
  }
}
