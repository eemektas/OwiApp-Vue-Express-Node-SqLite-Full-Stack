import Api from '@/services/Api'

export default {
  get () {
    return Api().get('weather')
  },
  post (city) {
    return Api().post('weather', pcitylace)
  }
}
