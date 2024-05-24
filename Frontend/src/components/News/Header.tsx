import React, { useEffect, useRef, useState } from 'react'
import * as s from '../styles/News/HeaderStyle'
import SearchInput from '@src/common/SearchInput'
import { useAtom } from 'jotai'
import { questionAtom } from '@src/stores/newsAtom'
import NewsSearchInput from './NewsSearchInput'

type Props = {
  hotKeywordData: {
    word: string
    count: number
  }[]
}

const Search = ({ hotKeywordData }: Props) => {
  const [search, setSearch] = useState(false)
  const [question, setQuestion] = useAtom(questionAtom)
  const [hotKeywords, setHotKeywords] = useState<string[]>([])
  const [num, setNum] = useState(-1)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    const keywordArr = hotKeywordData?.map((keyword, idx) => keyword?.word)
    if (keywordArr?.length > 10) {
      setHotKeywords(keywordArr?.slice(0, 10))
    } else if (keywordArr?.length > 0) {
      setHotKeywords(keywordArr)
    }

    setNum(0)
    if (hotKeywordData.length > 0) {
      setKeyword(hotKeywordData[0].word)
    }
  }, [hotKeywordData])

  // 10개의 키워드 2초마다
  useEffect(() => {
    const interval = setInterval(() => {
      if (num < hotKeywords?.length - 1) {
        setNum(prevNum => prevNum + 1)
        setKeyword(hotKeywords[num + 1])
      } else {
        setNum(0)
        if (hotKeywords.length > 0) {
          setKeyword(hotKeywords[0])
        }
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [num])

  return (
    <>
      <s.Wrapper className="header-wrapper">
        <s.SearchBar className="search-box">
          <NewsSearchInput
            search={search}
            setSearch={setSearch}
            question={question}
            setQuestion={setQuestion}
          />
        </s.SearchBar>
        {hotKeywordData.length > 0 ? (
          <s.HotKeyword className="hot-keyword">
            <s.KeywordTitle>실시간 인기 키워드</s.KeywordTitle>
            <s.SelectBox>
              <s.Label>
                <s.OptionNum>{num + 1}</s.OptionNum>
                {keyword}
              </s.Label>
              <s.SelectOptions>
                {hotKeywords?.map((keyword, idx) => (
                  <s.Option onClick={() => setQuestion(keyword)}>
                    <s.OptionNum>{idx + 1}</s.OptionNum>
                    {keyword}
                  </s.Option>
                ))}
              </s.SelectOptions>
            </s.SelectBox>
          </s.HotKeyword>
        ) : null}
      </s.Wrapper>
    </>
  )
}

export default Search
