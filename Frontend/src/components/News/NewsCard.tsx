import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import * as n from '../styles/News/NewsListStyle'
import image from '/image/thumbnail-sample3.png'
import { NewsSummary } from '@src/types/NewsType'
import { NoMeals } from '@mui/icons-material'

import defaultImage from '/image/defaultImage.png'

type Props = {
  news: NewsSummary
}

const NewsCard = ({ news }: Props) => {
  const navigate = useNavigate()

  return (
    <>
      <n.NewCardBox
        className="card-box"
        onClick={() => navigate(`/news/newsdetail/${news._id}`)}
      >
        <n.NewsThumbnailBox className="card-thumbnail">
          <n.NewsThumbnail
            image={news.thumbnail_url ? news.thumbnail_url : defaultImage}
          />
        </n.NewsThumbnailBox>
        <n.News>
          <n.NewsTitle className="card-title">{news.article_title}</n.NewsTitle>
          <n.NewsContent className="card-content">
            {news.article_summary}
          </n.NewsContent>
          <n.NewsInfo className="press-title">
            <n.Press>{news.press}</n.Press>
          </n.NewsInfo>
        </n.News>
      </n.NewCardBox>
    </>
  )
}

export default NewsCard
