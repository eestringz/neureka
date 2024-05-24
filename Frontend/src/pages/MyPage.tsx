import React from 'react'
import MyPageContainer from '@src/containers/MyPageContainer'
import TokenChecker from '@src/utils/TokenChecker'

type Props = {}

const MyPage = (props: Props) => {
  return (
    <>
      <TokenChecker />
      <MyPageContainer />
    </>
  )
}

export default MyPage
