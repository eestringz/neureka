import { removeCookie } from '@src/utils/loginCookie'

// const navigate = useNavigate()

export const Tokenlogout = () => {
  //   navigate('/')
  removeCookie('Authorization')
  removeCookie('refresh')
  removeCookie('JSESSIONID')
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('userInfo')
  localStorage.removeItem('isLogin')
  localStorage.removeItem('useremail')
  localStorage.removeItem('tokenExpireTime')
  localStorage.removeItem('markedWords')
}
