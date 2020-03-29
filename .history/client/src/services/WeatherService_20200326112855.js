import Api from '@/services/Api'

export default {
  get () {
    return Api().get('weather')
  },
  post () {
    return Api().get('weather')
  }
}
