import React, { useEffect } from 'react'
import * as m from '@src/containers/styles/MyPageContainerStyle'
import MyPageHeader from '@src/components/MyPage/MyPageHeader'
import MyInfo from '@src/components/MyPage/MyInfo'
import SlideBar from '@src/components/Main/SlideBar'
import { fetchUserInfo } from '@src/apis/AuthApi'
import { useQuery } from 'react-query'

type Props = {}

const MyPageContainer = (props: Props) => {
  const userEmail = JSON.parse(localStorage.getItem('useremail') as string)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // 유저 정보 조회하기
  const {
    isLoading: isUserInfoLoading,
    data: userInfoData,
    isError: isUserInfoError,
    error: userInfoError,
    refetch: userInfoRef,
  } = useQuery({
    queryKey: ['userInfo', userEmail],
    queryFn: () => fetchUserInfo(userEmail as string),
    onError: () => {
      return
    },
  })

  return (
    <>
      <SlideBar />
      <m.Wrapper>
        <m.Box>
          <MyPageHeader />
          <MyInfo userInfoData={userInfoData?.data} />
        </m.Box>
      </m.Wrapper>
    </>
  )
}

export default MyPageContainer
