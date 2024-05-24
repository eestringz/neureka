import React, { useEffect } from 'react'
import { publicRequest } from '@src/hooks/requestMethod'
import axios from 'axios'

import { useAtom } from 'jotai'
import {
  isLoginAtom,
  isAccessTokenAtom,
  isRefreshTokenAtom,
  isUserAtom,
  isUserEmailAtom,
} from '@src/stores/authAtom'
import { getCookie, removeCookie } from './loginCookie'
import { CollectionsBookmarkOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { Tokenlogout } from '@src/hooks/logout'

type Props = {}

const TokenChecker = (props: Props) => {
  const [isLogin, setIsLogin] = useAtom(isLoginAtom)
  const [accessToken, setAccessToken] = useAtom(isAccessTokenAtom)
  const [refreshToken, setRefreshToken] = useAtom(isRefreshTokenAtom)
  const [userInfo, setUserInfo] = useAtom(isUserAtom)
  const [userEmail, setUserEmail] = useAtom(isUserEmailAtom)

  const refresh = async () => {
    const res = await axios.post('http://localhost:8080/reissue')

    setAccessToken(res.headers.authorization)
    setRefreshToken(getCookie('refresh'))

    console.log('토큰 재발행')
  }

  const navigate = useNavigate()

  const update = () => {
    if (localStorage.getItem('isLogin') == 'true') {
      const now = new Date().getTime()
      const accessToken = localStorage.getItem('accessToken')
      const tokenExpireTime =
        (jwtDecode(accessToken as string).exp as number) * 1000

      const loginTime = Math.round(
        ((tokenExpireTime as number) - now) / 1000 / 60,
      )

      console.log('로그인 시간: ' + loginTime + '분 남음')

      if (loginTime > 0) {
        refresh()
      } else {
        navigate('/')
        setIsLogin(false)
        setAccessToken('')
        setRefreshToken('')
        setUserEmail('')
        setUserInfo({
          userInfoId: null,
          name: null,
          nickname: null,
          email: null,
          phone: null,
          birth: null,
          gender: null,
        })
        navigate('/')
        Tokenlogout()
        console.log('토큰 만료로 로그아웃됨')
      }
    } else {
      removeCookie('Authorization')
      removeCookie('refresh')
      removeCookie('JSESSIONID')
      return
    }
  }

  useEffect(() => {
    update()
  }, [])

  return <div></div>
}

export default TokenChecker
