import React from 'react'

import * as c from '../styles/News/CustomizedNewsStyle'
import CustomizedNewsItem from './CustomizedNewsItem'
import { RecommendNews } from '@src/types/NewsType'
import Loading from '@src/common/Loading'

type Props = {
  recommendNewsData: RecommendNews[]
}

const CustomizedNews = ({ recommendNewsData }: Props) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
  return (
    <>
      <c.Wrapper>
        <c.NewsBox>
          {recommendNewsData ? (
            recommendNewsData?.map((news, idx) => (
              <CustomizedNewsItem news={news} key={idx} />
            ))
          ) : (
            <Loading />
          )}
        </c.NewsBox>
      </c.Wrapper>
    </>
  )
}

export default CustomizedNews
