import React, { useEffect } from 'react'
import MainContainer from '@src/containers/MainContainer'
import { getCookie } from '@src/utils/loginCookie'
import TokenChecker from '@src/utils/TokenChecker'

const MainPage = () => {
  return (
    <>
      <TokenChecker />
      <MainContainer />
    </>
  )
}

export default MainPage
