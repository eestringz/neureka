import React, { useEffect, useState } from 'react'

import * as r from '@src/components/styles/Dictionary/RightWordsSectionStyle'
import WordCard from './WordCard'

import { Word, UserWord } from '@src/types/WordType'
import { useAtom } from 'jotai'
import { markedWordsAtom } from '@src/stores/dictionaryAtom'

type Props = {
  data: UserWord[]
}

const RightWordsSection = ({ data }: Props) => {
  const [markedWords, SetMarkedWords] = useAtom(markedWordsAtom)

  useEffect(() => {
    const filtered: Word[] = []
    data?.forEach(word => filtered.push(word.dictionary))
    SetMarkedWords(filtered)
  }, [data])

  return (
    <>
      <r.Wrapper className="wordsSection">
        <r.Title>MARK</r.Title>
        {data.length > 0 ? (
          <r.Box>
            {data?.map((word: any, idx: number) =>
              word?.dictionary ? (
                <WordCard
                  key={idx}
                  word={word?.dictionary}
                  marked={true}
                  side="right"
                />
              ) : null,
            )}
          </r.Box>
        ) : (
          <r.Empty>북마크 된 단어가 없어요</r.Empty>
        )}
      </r.Wrapper>
    </>
  )
}

export default RightWordsSection
