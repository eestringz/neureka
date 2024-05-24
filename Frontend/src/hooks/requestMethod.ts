import axios from 'axios'
import { Tokenlogout } from './logout'
import { useAtom } from 'jotai'
import { isLoginAtom } from '@src/stores/authAtom'

const BASE_URL = 'http://localhost:8080/api/v1/'

axios.defaults.withCredentials = true
const isLogin = localStorage.getItem('isLogin')
const accessToken = localStorage.getItem('accessToken')

export const publicRequest = axios.create({
  baseURL: BASE_URL,
})

publicRequest.defaults.withCredentials = true

export const setClientHeaders = (token: string) => {
  publicRequest.interceptors.request.use(function (config) {
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  })
}

publicRequest.interceptors.request.use(
  config => {
    if (accessToken) {
      config.headers['Authorization'] = accessToken
    } else {
      delete config.headers['Authorization'] // 토큰이 없을 때 헤더에서 제거
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  },
)

publicRequest.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    console.log(error.response)
    if (error.response?.status === 403) {
      console.log('토큰 없음')
      console.log(error)
      Tokenlogout()
    } else if (error.response?.status === 401) {
      console.log('토큰 만료')
      Tokenlogout()
      console.log(error)
    } else {
      return error
    }
  },
)
