import React, { useState } from 'react'
import defaultImage from '/image/defaultImage.png'
import * as n from '@src/components/styles/Main/NewsCard'
import { KeywordNews } from '@src/types/MainType'
import { useNavigate } from 'react-router-dom'
import SentimentTooltip from '@src/components/Main/SentimentTooltip'

type Props = {
  news: KeywordNews
  className: string
}

const NewsCard = ({ news, className }: Props) => {
  const navigate = useNavigate()
  const [showTooltip, setShowTooltip] = useState(false)

  const handleClick = () => {
    if (news._id) {
      navigate(`/news/newsdetail/${news._id}`)
    }
  }
  const handleMouseEnter = () => {
    if (news.sentiment.length > 0) {
      setShowTooltip(true)
    }
  }

  return (
    <>
      <n.NewCardBox
        className={`card-box ${className}`.trim()}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {showTooltip && <SentimentTooltip sentiments={news.sentiment} />}
        <n.NewsThumbnailBox className="card-thumbnail">
          <n.NewsThumbnail image={news.thumbnail_url || defaultImage} />
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
