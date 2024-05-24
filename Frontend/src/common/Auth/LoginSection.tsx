import * as l from '@src/common/styles/Auth/SectionStyle'
import kakao from '/image/kakao.png'
import google from '/image/google.png'

type Props = {}

const LoginSection = (props: Props) => {
  // 구글 로그인 url
  const google_url = 'http://localhost:8080/oauth2/authorization/google'

  // 카카오 로그인 url
  const kakao_url = 'http://localhost:8080/oauth2/authorization/kakao'

  const kakaoLogin = () => {
    login(kakao_url)
  }
  const googleLogin = () => {
    login(google_url)
  }

  const login = (url: string) => {
    window.location.href = url
  }

  return (
    <>
      <l.Title>로그인</l.Title>
      <l.Content>
        <l.Select className="kakao" onClick={kakaoLogin}>
          <l.Icon src={kakao} />
          <l.Msg>카카오로 간편 로그인</l.Msg>
        </l.Select>
        <l.Select className="google" onClick={googleLogin}>
          <l.Icon src={google} />
          <l.Msg>구글로 간편 로그인</l.Msg>
        </l.Select>
      </l.Content>
    </>
  )
}

export default LoginSection
