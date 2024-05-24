import React, { useEffect, useState } from 'react'
import * as d from '@src/containers/styles/DictionaryContainerStyle'
import LeftSearchSection from '@src/components/Dictionary/LeftSearchSection'
import RightWordsSection from '@src/components/Dictionary/RightWordsSection'

import { useQuery } from 'react-query'
import { fetchWords, fetchMarkedWords } from '@src/apis/DictionaryApi'

import { Word } from '@src/types/WordType'

import { markedWordsAtom, toggleMarkingAtom } from '@src/stores/dictionaryAtom'
import { useAtom } from 'jotai'
import DictionaryTutorial from '@src/tutorials/DIctionaryTutorial'
import { isUserEmailAtom } from '@src/stores/authAtom'
import { questionAtom } from '@src/stores/newsAtom'
import SlideBar from '@src/components/Main/SlideBar'
import Loading from '@src/common/Loading'

type Props = {}

const DictionaryContainer = (props: Props) => {
  const [markedWords, setMarkedWords] = useState<any>(null)
  const [mark, setMark] = useAtom(toggleMarkingAtom)
  // const [userEmail, setUserEmail] = useAtom(isUserEmailAtom)
  const [question, setQuestion] = useAtom(questionAtom)
  const userEmailFromLocalStorage = localStorage.getItem('useremail')
  const userEmail = userEmailFromLocalStorage
    ? JSON.parse(userEmailFromLocalStorage)
    : ''

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    getMarkedRefetch()
  }, [mark])

  useEffect(() => {
    getWordsRefetch()
  }, [question])

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
      setMarkedWords(res)
    },
  })

  if (isLoadingWords || isLoadingMarked)
    return (
      <>
        <Loading />
      </>
    )
  if (isErrorWords || isErrorMarked) return <>error</>

  return (
    <>
      <SlideBar />
      <d.Wrapper>
        <DictionaryTutorial />
        <d.Box className="dictionaryPage">
          <d.LeftWrapper className="searchSection">
            <LeftSearchSection data={wordsData?.data} mini={false} />
          </d.LeftWrapper>
          <RightWordsSection data={markedData?.data} />
        </d.Box>
      </d.Wrapper>
    </>
  )
}

export default DictionaryContainer
