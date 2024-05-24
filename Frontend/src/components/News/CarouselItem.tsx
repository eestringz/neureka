import React, { useEffect, useState } from 'react'

import * as c from '../styles/News/CarouselStyle'

import bgimage from '/image/background_paper.jpg'
import defaultImage from '/image/defaultImage.png'
import { useNavigate } from 'react-router-dom'
import { HotNews } from '@src/types/NewsType'

type Props = {
  news: HotNews
}

const CarouselItem = ({ news }: Props) => {
  const navigate = useNavigate()

  return (
    <>
      <c.CarouselCard
        className="carousel-item"
        bgimage={bgimage}
        onClick={() => navigate(`/news/newsdetail/${news._id}`)}
      >
        <c.CarouselContent>
          <c.HeadLine className="title">{news.headline_title}</c.HeadLine>
          <c.Thumbnail
            src={
              news.headline_thumbnail_url
                ? news.headline_thumbnail_url
                : defaultImage
            }
          />
          <c.Info className="info">
            <c.Date>{news.headline_date}</c.Date>
            <c.Press>{news.headline_press}</c.Press>
          </c.Info>
        </c.CarouselContent>
      </c.CarouselCard>
    </>
  )
}

export default CarouselItem
