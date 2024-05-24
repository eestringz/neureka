import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as m from '@src/components/styles/Main/MainCardStyle'
import wrapperbgimage from '/image/bg-image4.jpg'
import line from '/image/Line.png'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useNavigate } from 'react-router-dom'
import useMoveScroll from '@src/hooks/clickToScrollMethod'

type Props = {}

const MainCard = (props: Props) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const boxRef = useRef<HTMLDivElement>(null)

  const { element: newsRef, onMoveToElement: moveToNews } = useMoveScroll()
  const navigate = useNavigate()

  const updateScroll = useCallback(() => {
    if (boxRef.current) {
      const scrollTop = boxRef.current.scrollTop
      setScrollPosition(scrollTop)
    }
  }, [])

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.addEventListener('scroll', updateScroll)
    }

    return () => {
      if (boxRef.current) {
        boxRef.current.removeEventListener('scroll', updateScroll)
      }
    }
  }, [updateScroll])

  return (
    <>
      <m.Wrapper>
        <m.Box ref={boxRef} bgimage={wrapperbgimage}>
          <m.Title className={scrollPosition > 30 ? `changed` : ''}>
            NEúrēka
          </m.Title>
          <m.Info
            className={scrollPosition > 30 ? `changed` : ``}
            onClick={() => navigate('news')}
          >
            오늘의 뉴스
            <span>
              <MoreHorizIcon />
            </span>
          </m.Info>
          <m.Info
            className={scrollPosition > 30 ? `changed` : ``}
            onClick={moveToNews}
          >
            관심 키워드 맞춤 뉴스 추천
            <span>
              <MoreHorizIcon />
            </span>
          </m.Info>
          <m.Info
            className={scrollPosition > 30 ? `changed` : ``}
            onClick={() => navigate('stocks')}
          >
            원하는 기업의 각종 정보를 모아서
            <span>
              <MoreHorizIcon />
            </span>
          </m.Info>
          <m.Arrow className={scrollPosition > 30 ? `none` : ``} />
        </m.Box>
        {/* <m.Line src={line} /> */}
      </m.Wrapper>
      <div ref={newsRef}></div>
    </>
  )
}

export default MainCard
