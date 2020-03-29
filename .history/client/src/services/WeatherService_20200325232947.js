import Api from '@/services/Api'

export default {
  get (location) {
    return Api().get('weather', location)
  },
  weather (place) {
    return Api().post('weather', place)
  }
}
