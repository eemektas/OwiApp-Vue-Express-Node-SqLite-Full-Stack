import Api from '@/services/Api'

export default {
  index (place) {
    return Api().get('weather')
  },
  post (place) {
    return Api().post('weather', place)
  }
}
