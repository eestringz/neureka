import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { modalOpenAtom } from '@src/stores/authModalAtom'
import Modal from 'react-modal'
import * as m from '@src/common/styles/Auth/AuthModalStyle'
import LoginSection from './LoginSection'
import SignupSection from './SignupSection'

import { getCookie } from '@src/utils/loginCookie'
import {
  isLoginAtom,
  isAccessTokenAtom,
  isRefreshTokenAtom,
  isUserAtom,
  isUserEmailAtom,
} from '@src/stores/authAtom'
import base64 from 'base-64'
import { useQuery } from 'react-query'
import { fetchUserInfo } from '@src/apis/AuthApi'
import { setClientHeaders } from '@src/hooks/requestMethod'

type Props = {}

const AuthModal = (props: Props) => {
  const [isLogin, setIsLogin] = useAtom(isLoginAtom)
  const [accessToken, setAccessToken] = useAtom(isAccessTokenAtom)
  const [refreshToken, setRefreshToken] = useAtom(isRefreshTokenAtom)
  const [userInfo, setUserInfo] = useAtom(isUserAtom)
  const [userEmail, setUserEmail] = useAtom(isUserEmailAtom)

  const parseJwt = (token: string) => {
    let payload = token.substring(
      token.indexOf('.') + 1,
      token.lastIndexOf('.'),
    )
    let decodingInfo = base64.decode(payload)
    return JSON.parse(decodingInfo)
  }

  useEffect(() => {
    if (getCookie('Authorization')) {
      setAccessToken('Bearer ' + getCookie('Authorization'))
      setRefreshToken(getCookie('refresh'))

      setClientHeaders(getCookie('Authorization'))

      setIsLogin(true)
      const UserInfo = parseJwt(getCookie('Authorization'))
      setUserInfo(prevUserInfo => ({
        ...prevUserInfo,
        email: UserInfo.email,
      }))
      setUserEmail(UserInfo.email)
    }
  }, [])

  const [isOpen, setIsOpen] = useAtom(modalOpenAtom)
  const [isLoginSection, SetIsLoginSection] = useState(true)

  const closeModal = () => {
    setIsOpen(false)
  }
  const afterOpenModal = () => {}

  const ToggleSection = () => {
    SetIsLoginSection(!isLoginSection)
  }

  return (
    <>
      <m.Global />
      <m.MyModal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <m.Wrapper>
          <m.CloseBtn onClick={closeModal} />
          {isLoginSection ? <LoginSection /> : <SignupSection />}

          <m.OptionBtn>
            <m.ToggleBtn onClick={ToggleSection}>
              {isLoginSection
                ? `아직 회원이 아니신가요?`
                : `이미 회원이신가요?`}
            </m.ToggleBtn>
          </m.OptionBtn>
        </m.Wrapper>
      </m.MyModal>
    </>
  )
}

export default AuthModal
