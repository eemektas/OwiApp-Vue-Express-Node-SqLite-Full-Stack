import Api from '@/services/Api'

export default {
  show (place) {
    return Api().get('weather', place)
  },
  post (place) {
    return Api().post('weather', place)
  }
}
