import Api from '@/services/Api'

export default {
  get () {
    return Api().get('weather')
  },
  post (place) {
    return Api().post('weather', place)
  }
}
