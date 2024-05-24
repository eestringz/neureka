import { publicRequest } from '@src/hooks/requestMethod'
import { Search, SearchRecommend, UserInterest } from '@src/types/NewsType'

export const fetchNewsList = async () => {
  return await publicRequest.get('news')
}

export const fetchNewsDetail = async (newsId: string, email: string) => {
  return await publicRequest.get('news/newsdetail', {
    params: {
      email: email,
      newsId: newsId,
    },
  })
}

export const fetchHotNews = async () => {
  return await publicRequest.get('news/hot')
}

export const fetchSearch = async (data: Search) => {
  return await publicRequest.post('news/search/word', data)
}

export const fetchHotSearch = async () => {
  return await publicRequest.get('news/hot/word')
}

export const fetchOtherNews = async (newsId: string) => {
  return await publicRequest.post(
    'news/other',
    {},
    {
      params: {
        newsId: newsId,
      },
    },
  )
}

export const fetchGetGrade = async (email: string, newsId: string) => {
  return await publicRequest.get('news/grade', {
    params: {
      email: email,
      newsId: newsId,
    },
  })
}

export const fetchPostGrade = async (data: {
  email: string
  newsId: string
  grade: string
}) => {
  return await publicRequest.post(
    'news/grade',
    {},
    {
      params: data,
    },
  )
}

export const fetchRecommendNews = async (data: SearchRecommend) => {
  return await publicRequest.post('news/recommend_for_user', data)
}

export const fetchUserInterest = async (data: UserInterest) => {
  return await publicRequest.post('news/update_interests', data)
}
