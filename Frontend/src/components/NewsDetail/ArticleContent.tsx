import React, { useEffect } from 'react'

import * as n from '@src/components/styles/NewsDetail/ArticleContentStyle'

import sample from '/image/ky.gif'
import { NewsDetail } from '@src/types/NewsType'

type Props = {
  newsData: NewsDetail
}

const ArticleContent = ({ newsData }: Props) => {
  return (
    <>
      <n.Wrapper>
        <n.Title className="article-title">{newsData.detail_title}</n.Title>
        <n.Info>
          <n.Press>{newsData.detail_press}</n.Press>
          <n.Date className="article-date">{newsData.detail_date}</n.Date>
        </n.Info>
        {/* <n.Image className="article-thumbnail" src={sample} /> */}
        <n.Content className="article-content">
          <div
            dangerouslySetInnerHTML={{ __html: newsData?.detail_text || '' }}
          />
        </n.Content>
      </n.Wrapper>
    </>
  )
}

export default ArticleContent
