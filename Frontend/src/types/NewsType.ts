import { Sentiment } from '@src/types/MainType'

export type NewsSummary = {
  _id: string
  thumbnail_url: string
  article_title: string
  article_link: string
  article_summary: string
  press: string
  date_time: string
  keywords: string[]
  topic: string
  sentiment: Sentiment[]
  nouns: string
}

export type NewsDetail = {
  detail_date: string
  detail_press: string
  detail_text: string
  detail_title: string
  detail_url: string
}

export type HotNews = {
  headline_date: string
  headline_press: string
  headline_thumbnail_url: string
  headline_title: string
  headline_url: string
  _id: string
}

export type Search = {
  word: string
  searchTime: string
  swid: number
}

export type OtherNews = {
  _id: string
  title: string
  thumbnail_url: string | null
}

export type RecommendNews = {
  _id: string
  thumbnail_url: string
  article_title: string
  article_link: string
  article_summary: string
  press: string
  date_time: string
  keywords: string[]
  topic: string
  sentiment: Sentiment[]
}

export type SearchRecommend = {
  user_id: string
  topic: string[]
}

export type UserInterest = {
  user_id: string
  article_id: string
}
