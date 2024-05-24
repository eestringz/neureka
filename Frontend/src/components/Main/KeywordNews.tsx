import * as k from '@src/components/styles/Main/KeywordNews'
import { useAtom } from 'jotai'
import NewsCard from '@src/components/Main/NewsCard'
import { selectedKeywordAtom } from '@src/stores/mainAtom'
import { KeywordNews } from '@src/types/MainType'
import useMoveScroll from '@src/hooks/clickToScrollMethod'
import { useEffect } from 'react'

import lineImage from '/image/Line2.png'

export type KeywordNewsProps = {
  keywordNews: KeywordNews[]
}

const KeywordNews = ({ keywordNews }: KeywordNewsProps) => {
  const [selectedKeyword] = useAtom(selectedKeywordAtom)
  const safeKeywordNews = Array.isArray(keywordNews) ? keywordNews : []
  const { element: newsRef, onMoveToElement: moveToNews } = useMoveScroll()

  // 더미 뉴스 데이터 생성
  const dummyNews = {
    _id: '',
    message: '관련 기사가 없습니다',
    thumbnail_url: '',
    article_title: '관련 기사가 없습니다',
    article_link: '',
    article_summary: '',
    press: '',
    date_time: '',
    keyword: [],
    topic: '',
    sentiment: [],
  }

  // 필요한 더미 데이터 개수 계산
  const neededCount = Math.max(0, 4 - safeKeywordNews.length)
  const dummyNewsArray = Array.from({ length: neededCount }, () => dummyNews)

  // 기존 뉴스 데이터와 더미 데이터 합치기
  const resultKeywordNews = [...safeKeywordNews, ...dummyNewsArray]

  useEffect(() => {
    if (selectedKeyword.keyword && newsRef.current) {
      moveToNews()
    }
  }, [selectedKeyword])

  return (
    <>
      <k.container className="KeywordNews" ref={newsRef}>
        {selectedKeyword.keyword !== '' ? (
          <>
            <k.Line src={lineImage} />
            {/* <k.KeywordTitle>Keyword News</k.KeywordTitle> */}
            <k.KeywordCircle>
              <k.SelectedKeyword>{selectedKeyword.keyword}</k.SelectedKeyword>
              <k.NewsGrid>
                {resultKeywordNews.map((news, index) => (
                  <NewsCard
                    key={index}
                    news={news}
                    className={`${index % 2 === 0 ? 'odd' : 'even'}`}
                  />
                ))}
              </k.NewsGrid>
            </k.KeywordCircle>
          </>
        ) : (
          <k.KeywordTitle>키워드를 선택하세요.</k.KeywordTitle>
        )}
      </k.container>
    </>
  )
}

export default KeywordNews
