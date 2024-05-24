import { publicRequest } from '@src/hooks/requestMethod'
import queryString from 'query-string'
import {
  CompanyLikeParmasType,
  CompanyLatestParamsType,
  CompanySubscribeType,
} from '@src/types/CompanyType'

// 기업 전체 조회
export const fetchCompanyList = async () => {
  return await publicRequest
    .get('company/list')
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 선택 기업 차트 데이터 조회
export const fetchCompanyPrice = async (code: string) => {
  return await publicRequest
    .get(`company/stock/price?code=${code}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 관심 종목 조회
export const fetchCompanyLikeList = async (email: string) => {
  return await publicRequest
    .get(`company/like/list?email=${email}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 관심 종목 등록
export const fetchCompanyLike = async (params: CompanyLikeParmasType) => {
  return await publicRequest
    .post(`company/like?${queryString.stringify(params)}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 관심 종목 등록 취소
export const fetchCompanyUnLike = async (params: CompanyLikeParmasType) => {
  return await publicRequest
    .delete(`company/like?${queryString.stringify(params)}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 최근 조회 기업 조회
export const fetchCompanyLatestList = async (email: string) => {
  return await publicRequest
    .get(`company/read?email=${email}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 최근 조회 기업 등록
export const fetchCompanyLatest = async (params: CompanyLatestParamsType) => {
  return await publicRequest
    .post(`company/read?${queryString.stringify(params)}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 선택 기업 최근 뉴스 조회
export const fetchCompanyNewsList = async (company: string) => {
  return await publicRequest
    .get(`company/newsfive?company=${company}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 구독 기업 여부 변경
export const fetchCompanySubscribe = async (params: CompanySubscribeType) => {
  return await publicRequest
    .post(`company/send/mail/check?${queryString.stringify(params)}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
