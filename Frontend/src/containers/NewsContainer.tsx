import Carousel from '@src/components/News/Carousel'
import React, { useEffect, useRef, useState } from 'react'
import Header from '@src/components/News/Header'
import CustomizedNews from '@src/components/News/CustomizedNews'
import NewsList from '@src/components/News/NewsList'

import { useMutation, useQuery } from 'react-query'
import {
  fetchNewsList,
  fetchHotNews,
  fetchHotSearch,
  fetchRecommendNews,
} from '@src/apis/NewsApi'
import { useAtom, useAtomValue } from 'jotai'
import { questionAtom } from '@src/stores/newsAtom'
import { RecommendNews, SearchRecommend } from '@src/types/NewsType'
import Loading from '@src/common/Loading'
import { isLoginAtom } from '@src/stores/authAtom'

import * as n from '@src/containers/styles/NewsContainerStyle'
import bgimage from '/image/background_paper.jpg'
import SlideBar from '@src/components/Main/SlideBar'

type Props = {}

const NewsContainer = (props: Props) => {
  const [search, setSearch] = useAtom(questionAtom)
  const [recommendNews, setRecommendNews] = useState<RecommendNews[] | null>(
    null,
  )
  const [hotKeywordsData, setHotKeywordsData] = useState<
    | {
        word: string
        count: number
      }[]
    | null
  >(null)
  const isLogin = useAtomValue(isLoginAtom)

  const userEmail = JSON.parse(localStorage.getItem('useremail') as string)

  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [day, setDay] = useState(new Date().getDate())
  const [question, setQuestion] = useAtom(questionAtom)

  useEffect(() => {
    window.scrollTo(0, 0)
    recommendNewsMutate({
      user_id: userEmail,
      topic: [],
    })
    setQuestion('')
  }, [])

  const { mutate: recommendNewsMutate } = useMutation(
    (data: SearchRecommend) => fetchRecommendNews(data),
    {
      onSuccess: res => {
        setRecommendNews(res.data)
      },
    },
  )

  const {
    isLoading: isNewsListLoading,
    data: newsData,
    isError: isNewsListError,
    error: newsListError,
  } = useQuery({
    queryKey: 'get-news',
    queryFn: fetchNewsList,
  })

  const {
    isLoading: isHotNewsLoading,
    data: hotNewsData,
    isError: isHotNewsError,
    error: hotNewsError,
  } = useQuery({
    queryKey: 'get-hot-news',
    queryFn: fetchHotNews,
  })

  const {
    isLoading: isHotKeyworodsLoading,
    data: hotKeywordData,
    isError: isHotKeywordError,
    error: hotKeywordError,
    refetch,
  } = useQuery({
    queryKey: 'hot-keywords',
    queryFn: fetchHotSearch,
    onSuccess: res => {
      setHotKeywordsData(res.data)
    },
  })

  useEffect(() => {
    refetch()
  }, [search])

  if (isNewsListLoading) {
    return (
      <>
        <Loading />
      </>
    )
  }

  if (isHotNewsLoading) {
    return (
      <>
        <Loading />
      </>
    )
  }

  if (isHotKeyworodsLoading) {
    return (
      <>
        <Loading />
      </>
    )
  }

  if (isNewsListError) {
    return <>{newsListError}</>
  }

  const userInfo = JSON.parse(localStorage.getItem('userInfo') as string)

  return (
    <>
      <SlideBar />
      <n.Wrapper style={{ marginTop: '20px' }}>
        <n.Header bgimage={bgimage} className="header">
          <n.LeftSide className="left">
            <n.SideHeader>
              <span>{`${year}年 ${month}月 ${day}日`}, 오늘의 헤드라인</span>
            </n.SideHeader>
            <Carousel hotNewsData={hotNewsData?.data} />
          </n.LeftSide>

          {isLogin ? (
            <n.RightSide className="right">
              <n.SideHeader>
                {userInfo ? (
                  <span>
                    {userInfo.name ? userInfo.name : userInfo.email}님을 위한
                    뉴스
                  </span>
                ) : null}
              </n.SideHeader>
              <CustomizedNews
                recommendNewsData={recommendNews as RecommendNews[]}
              />
            </n.RightSide>
          ) : null}
        </n.Header>
        <Header hotKeywordData={hotKeywordData?.data} />
        <NewsList newsData={newsData?.data} />
      </n.Wrapper>
    </>
  )
}

export default NewsContainer
