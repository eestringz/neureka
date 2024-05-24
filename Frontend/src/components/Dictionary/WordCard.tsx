import React, { useEffect, useState } from 'react'

import * as c from '@src/components/styles/Dictionary/WordCardStyle'

import { Word } from '@src/types/WordType'

import saved from '/image/save.png'
import notsaved from '/image/notsave.png'

import { useMutation } from 'react-query'
import { fetchMarkWord, fetchUnmarkWord } from '@src/apis/DictionaryApi'
import { MarkWord } from '@src/types/WordType'

import { useAtom } from 'jotai'
import { markedWordsAtom, toggleMarkingAtom } from '@src/stores/dictionaryAtom'
import { isLoginAtom, isUserEmailAtom } from '@src/stores/authAtom'
import { modalOpenAtom } from '@src/stores/authModalAtom'

type Props = {
  word: Word | null
  marked: boolean
  side: string
}

const WordCard = ({ word, marked, side }: Props) => {
  const [userEmail, setUserEmail] = useAtom(isUserEmailAtom)
  const [isSave, SetIsSave] = useState(false)
  const [mark, setMark] = useAtom(toggleMarkingAtom)
  const [isLogin, setIsLogin] = useAtom(isLoginAtom)
  const [openLogin, setOpenLogin] = useAtom(modalOpenAtom)
  const [titleClicked, setTitleClicked] = useState(false)

  // 단어 즐겨찾기
  const { mutate: markMutate } = useMutation(
    (data: MarkWord) => fetchMarkWord(data),
    {
      onSuccess: () => {
        setMark(!mark)
      },
    },
  )

  //단어 즐겨찾기 해제
  const { mutate: unmarkMutate } = useMutation(
    (data: MarkWord) => fetchUnmarkWord(data),
    {
      onSuccess: () => {
        setMark(!mark)
      },
    },
  )

  // 즐겨찾기 버튼 클릭 이벤트
  const handleMark = () => {
    const titleWithoutTags = word?.title
      ? word.title.replace(/(<([^>]+)>)/gi, '')
      : ''
    if (isLogin) {
      SetIsSave(true)
      markMutate({
        email: userEmail,
        title: titleWithoutTags,
      })
    } else {
      setOpenLogin(true)
    }
  }

  // 즐겨찾기 해제 버튼 클릭 이벤트
  const handleUnmark = () => {
    SetIsSave(false)
    unmarkMutate({
      email: userEmail,
      title: word?.title as string,
    })
  }

  return (
    <>
      <c.Card>
        <c.CardBox className="cardBox">
          {marked && side == 'right' ? (
            <c.Title>
              <div
                dangerouslySetInnerHTML={{ __html: word?.title || '' }}
                onClick={() => setTitleClicked(!titleClicked)}
              />

              <c.deleteBtn className="deleteBtn" onClick={handleUnmark} />
            </c.Title>
          ) : marked ? (
            <c.Title>
              <div dangerouslySetInnerHTML={{ __html: word?.title || '' }} />

              <c.saveBtn className="saveBtn" src={saved} />
            </c.Title>
          ) : side == 'right' ? (
            <c.Title className="mini">
              <div
                dangerouslySetInnerHTML={{ __html: word?.title || '' }}
                onClick={() => setTitleClicked(!titleClicked)}
              />
            </c.Title>
          ) : (
            <c.Title>
              <div dangerouslySetInnerHTML={{ __html: word?.title || '' }} />

              <c.saveBtn
                className="saveBtn"
                src={notsaved}
                onClick={handleMark}
              />
            </c.Title>
          )}
          {side === 'left' ? (
            <c.Content>
              <div dangerouslySetInnerHTML={{ __html: word?.content || '' }} />
            </c.Content>
          ) : (
            <c.Content>
              <div
                dangerouslySetInnerHTML={{ __html: word?.content || '' }}
                className={titleClicked ? 'clicked' : 'none'}
              />
            </c.Content>
          )}
        </c.CardBox>
      </c.Card>
    </>
  )
}

export default WordCard
