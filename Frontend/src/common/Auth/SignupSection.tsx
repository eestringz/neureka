import React from 'react'

import * as l from '@src/common/styles/Auth/SectionStyle'

import kakao from '/image/kakao.png'
import google from '/image/google.png'

type Props = {}

const SignupSection = (props: Props) => {
  // 구글 가입 url
  const google_url = 'http://localhost:8080/oauth2/authorization/google'

  // 카카오 가입 url
  const kakao_url = 'http://localhost:8080/oauth2/authorization/kakao'

  const kakaoSignup = () => {
    signup(kakao_url)
  }
  const googleSignup = () => {
    signup(google_url)
  }

  const signup = (url: string) => {
    window.location.href = url
  }

  return (
    <>
      <l.Title>회원가입</l.Title>
      <l.Content>
        <l.Select className="kakao" onClick={kakaoSignup}>
          <l.Icon src={kakao} />
          <l.Msg>카카오 계정으로 시작하기</l.Msg>
        </l.Select>
        <l.Select className="google" onClick={googleSignup}>
          <l.Icon src={google} />
          <l.Msg>구글 계정으로 시작하기</l.Msg>
        </l.Select>
      </l.Content>
    </>
  )
}

export default SignupSection
