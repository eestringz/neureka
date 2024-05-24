import React, { useEffect, useState } from 'react'

import * as s from '@src/components/styles/NewsDetail/SimilarArticleStyle'
import SimilarArticleCard from './SimilarArticleCard'

import sampleimage from '/image/satoru.gif'
import { useMutation } from 'react-query'
import { fetchOtherNews } from '@src/apis/NewsApi'
import { OtherNews } from '@src/types/NewsType'
import Loading from '@src/common/Loading'

type Props = {
  otherNewsData: OtherNews[]
}

const SimilarArticle = ({ otherNewsData }: Props) => {
  // useEffect(() => {
  //   otherNewsMutate(newsId)
  // }, [])

  return (
    <>
      <s.Wrapper>
        <s.Title className="title">방금 보신 기사와 비슷해요 !</s.Title>
        <s.ArticleBox className="card-box">
          {otherNewsData ? (
            otherNewsData?.map((news, idx) => (
              <SimilarArticleCard news={news} key={idx} />
            ))
          ) : (
            <Loading />
          )}
        </s.ArticleBox>
      </s.Wrapper>
    </>
  )
}

export default SimilarArticle
