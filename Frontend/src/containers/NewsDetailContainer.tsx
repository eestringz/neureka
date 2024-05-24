import React, { useEffect, useState } from 'react'
import * as n from '@src/containers/styles/NewsDetailContainerStyle'

import bgimage from '/image/bg-image-newsDetail.jpg'
import ArticleContent from '@src/components/NewsDetail/ArticleContent'
import ArticleGrade from '@src/components/NewsDetail/ArticleGrade'
import SimilarArticle from '@src/components/NewsDetail/SimilarArticle'
import BackBtn from '@src/components/NewsDetail/BackBtn'
import { useMutation, useQuery } from 'react-query'
import {
  fetchGetGrade,
  fetchNewsDetail,
  fetchOtherNews,
  fetchUserInterest,
} from '@src/apis/NewsApi'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { isLoginAtom, isUserEmailAtom } from '@src/stores/authAtom'
import LeftSearchSection from '@src/components/Dictionary/LeftSearchSection'
import { fetchMarkedWords, fetchWords } from '@src/apis/DictionaryApi'
import { OtherNews, UserInterest } from '@src/types/NewsType'
import TextToSpeechContainer from './TextToSpeechContainer'
import { markedWordsAtom, toggleMarkingAtom } from '@src/stores/dictionaryAtom'
import { Word, UserWord } from '@src/types/WordType'
import Loading from '@src/common/Loading'
import SlideBar from '@src/components/Main/SlideBar'
import backgroundimage from '/image/background_paper.jpg'
import { ConstructionOutlined } from '@mui/icons-material'

type Props = {
  newsId: string
}

const NewsDetailContainer = ({ newsId }: Props) => {
  const [otherNews, setOtherNews] = useState<OtherNews[] | null>(null)
  const [isLogin, setIsLogin] = useAtom(isLoginAtom)

  const userEmail = JSON.parse(localStorage.getItem('useremail') as string)

  const [more, setMore] = useState(true)
  const [openDictionary, setOpenDictionary] = useState(false)
  const [openTTS, setOpenTTS] = useState(false)

  const [markedWords, SetMarkedWords] = useAtom(markedWordsAtom)

  const [mark, setMark] = useAtom(toggleMarkingAtom)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    gradeRefetch()
    otherNewsMutate(newsId)
    if (userEmail) {
      userInterestMutate({
        user_id: userEmail,
        article_id: newsId,
      })
    }
  }, [newsId])

  const navigate = useNavigate()

  const goSearch = () => {
    if (openDictionary) {
      setOpenDictionary(false)
    }
    if (openTTS) {
      setOpenTTS(false)
    }
    setMore(!more)
  }

  const goDictionary = () => {
    setOpenDictionary(true)
    setMore(false)
  }

  const goTTS = () => {
    setOpenTTS(true)
    setMore(false)
  }

  const {
    isLoading: isNewsListLoading,
    data: newsData,
    isError: isNewsListError,
    error: newsListError,
  } = useQuery({
    queryKey: ['news-detail', newsId],
    queryFn: () => fetchNewsDetail(newsId, userEmail),
    onSuccess: res => {
      if (res.status === undefined) {
        // navigate(-1)
        navigate('/news')
      }
    },
  })

  const {
    isLoading: isGradeLoading,
    data: newsGrade,
    isError: isGradeError,
    error: gradeError,
    refetch: gradeRefetch,
  } = useQuery({
    queryKey: ['news-grade', newsId],
    queryFn: () => fetchGetGrade(userEmail, newsId),
  })

  const {
    isLoading: isLoadingWords,
    data: wordsData,
    isError: isErrorWords,
    error: errorWords,
    refetch: getWordsRefetch,
  } = useQuery({
    queryKey: 'get-words',
    queryFn: fetchWords,
  })

  const { mutate: otherNewsMutate } = useMutation(
    (newsId: string) => fetchOtherNews(newsId),
    {
      onSuccess: res => {
        setOtherNews(res.data)
      },
    },
  )

  const { mutate: userInterestMutate } = useMutation((data: UserInterest) =>
    fetchUserInterest(data),
  )

  useEffect(() => {
    getMarkedRefetch()
  }, [mark])

  const {
    isLoading: isLoadingMarked,
    data: markedData,
    isError: isErrorMarked,
    error: errorMarked,
    refetch: getMarkedRefetch,
  } = useQuery({
    queryKey: 'get-marked',
    queryFn: () => fetchMarkedWords(userEmail),
    onSuccess: res => {
      const filtered: Word[] = []
      res.data?.forEach((word: UserWord) => filtered.push(word.dictionary))
      SetMarkedWords(filtered)
    },
  })
  if (isNewsListLoading) {
    return (
      <>
        <Loading />
      </>
    )
  }

  return (
    <>
      {/* <n.HeaderImage bgimage={bgimage} /> */}
      <SlideBar />
      <n.Container
        style={{ marginTop: '20px' }}
        $backgroundimage={backgroundimage}
      >
        <n.SearchSection className={openDictionary ? 'show' : 'none'}>
          <LeftSearchSection data={wordsData?.data} mini={true} />
        </n.SearchSection>
        <n.TTSSection className={openTTS ? 'show' : 'none'}>
          <TextToSpeechContainer articleContent={newsData?.data.detail_text} />
        </n.TTSSection>

        <div className="sidebar">
          <n.GoMoreBtn onClick={goSearch}>
            {openDictionary || openTTS ? <n.Clear /> : null}
          </n.GoMoreBtn>

          <n.SelectBox className={more ? 'show' : 'none'}>
            <n.Select onClick={goDictionary}>단어 검색하기</n.Select>
            <n.Select onClick={goTTS}>음성 뉴스 듣기</n.Select>
          </n.SelectBox>
        </div>

        <ArticleContent newsData={newsData?.data} />
        {isLogin ? (
          <ArticleGrade grade={newsGrade?.data} newsId={newsId} />
        ) : null}
        <SimilarArticle otherNewsData={otherNews as OtherNews[]} />
        {/* <BackBtn /> */}
      </n.Container>
    </>
  )
}

export default NewsDetailContainer
