import Api from '@/services/Api'

export default {
  get () {
    return Api().get('weather')
  },
  post (weatherData) {
    return Api().post('weather', weatherData)
  }
}
