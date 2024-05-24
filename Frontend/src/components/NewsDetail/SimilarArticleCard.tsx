import React, { useEffect, useState } from 'react'

import * as c from '@src/components/styles/NewsDetail/SimilarArticleCardStyle'

import { useQuery } from 'react-query'
import { fetchNewsDetail } from '@src/apis/NewsApi'
import { OtherNews } from '@src/types/NewsType'

import defaultThumbnail from '/image/defaultImage.png'
import { useNavigate } from 'react-router-dom'

type Props = {
  news: OtherNews
}

const SimilarArticleCard = ({ news }: Props) => {
  const navigate = useNavigate()

  return (
    <>
      <c.Wrapper
        className="card"
        onClick={() => navigate(`/news/newsdetail/${news._id}`)}
      >
        <c.Thumbnail
          className="card-thumbnail"
          src={news.thumbnail_url ? news.thumbnail_url : defaultThumbnail}
        />
        <c.TitleBox>
          <c.Title className="card-title">{news.title}</c.Title>
        </c.TitleBox>
      </c.Wrapper>
    </>
  )
}

export default SimilarArticleCard
