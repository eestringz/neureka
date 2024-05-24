export type CompanyType = {
  companyId: number
  code: string
  companyName: string
}

export type CompanyPriceType = {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  change: number | null
  ema12?: number
  ema26?: number
  bullPower?: number
  bearPower?: number
}

export type UserType = {
  userId: number
  username: string
  name: string
  email: string
  role: string
}

export type CompanyLikeType = {
  id: number
  company: CompanyType
  user: UserType
  isSendmail: boolean
}

export type CompanyLikeParmasType = {
  email: string
  code: string
}

export type CompanyLatestParamsType = {
  email: string
  code: string
}

export type CompanyLatestType = {
  crId: number
  email: string
  company: CompanyType
}

export type CompanyNewsType = {
  link: string
  press: string
  summary: string
  thumbnail_url: string
  title: string
  article_date: string
  _id: string
}

export type CompanySubscribeType = {
  code: string
  email: string
  isCheck: boolean
}
