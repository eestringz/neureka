import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import * as l from '@src/components/styles/Dictionary/LeftSearchSectionStyle'

import WordCard from './WordCard'

import { Word } from '@src/types/WordType'
import SearchInput from './SearchInput'

import { useAtomValue } from 'jotai'
import { markedWordsAtom } from '@src/stores/dictionaryAtom'

import searchIcon from '/image/searchIcon.png'

type Props = {
  data: Word[] | null
  mini: boolean
}

const LeftSearchSection = ({ data, mini }: Props) => {
  const [search, setSearch] = useState(false)
  const [question, setQuestion] = useState<null | string>(null)
  const [words, SetWords] = useState<null | Word[]>(data)
  const [originalWords, SetOriginalWords] = useState<null | Word[]>(data)

  const markedWords = useAtomValue(markedWordsAtom)

  const boxRef = useRef<HTMLDivElement>(null)

  // 키워드 검색 시 제목 또는 내용에 포함된 카드만 조회 (검색 내용이 없을 시 전체 단어 보여줌)
  useEffect(() => {
    if (question) {
      const filteredWords = data?.filter(
        word =>
          word.title.includes(question) || word.content.includes(question),
      )
      if (filteredWords) {
        const regex = new RegExp(question, 'g')
        const highlightedWords = filteredWords.map(word => ({
          ...word,
          title: word.title.replace(
            regex,
            "<span class='highlight'>" + question + '</span>',
          ),
          content: word.content.replace(
            regex,
            "<span class='highlight'>" + question + '</span>',
          ),
        }))
        SetWords(highlightedWords)
      }
    } else {
      SetWords(originalWords)
    }

    if (boxRef.current) {
      boxRef.current.scrollTo(0, 0)
    }
  }, [question])

  return (
    <>
      <l.Wrapper className={mini ? 'miniSearchSection' : 'searchSection'}>
        <l.Box>
          <l.SearchBar>
            <SearchInput
              search={search}
              setSearch={setSearch}
              question={question}
              setQuestion={setQuestion}
            />
          </l.SearchBar>

          <l.Words ref={boxRef}>
            {words && words.length > 0 ? (
              words.map((word, idx) =>
                markedWords?.some(markedWord => markedWord?.id === word?.id) ? (
                  <WordCard
                    word={word}
                    key={idx}
                    marked={mini ? false : true}
                    side={mini ? 'right' : 'left'}
                  />
                ) : (
                  <WordCard
                    word={word}
                    key={idx}
                    marked={false}
                    side={mini ? 'right' : 'left'}
                  />
                ),
              )
            ) : (
              <l.Empty>
                <l.Search src={searchIcon} />
                검색 결과가 없어요
              </l.Empty>
            )}
          </l.Words>
        </l.Box>
      </l.Wrapper>
    </>
  )
}

export default LeftSearchSection
