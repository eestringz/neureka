import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import {
  selectedCompanyAtom,
  LikedCompanyListAtom,
} from '@src/stores/stockAtom'
import Tooltip from '@src/common/Tooltip'
import * as s from '@src/components/styles/Stocks/MainTopSectionStyle'

const MainTopSection = (props: {
  handleAddMyStock: () => void
  handleRemoveMyStock: () => void
  handleSubscribeCompany: (code: string) => void
  handleUnSubscribeCompany: (code: string) => void
}) => {
  const {
    handleAddMyStock,
    handleRemoveMyStock,
    handleSubscribeCompany,
    handleUnSubscribeCompany,
  } = props

  // const userEmail = useAtomValue(isUserEmailAtom) // 유저 이메일
  const userEmail = JSON.parse(localStorage.getItem('useremail') as string)

  const [selectedStock] = useAtom(selectedCompanyAtom) // select 한 종목
  const [likedCompanyList] = useAtom(LikedCompanyListAtom) // 관심 기업 리스트
  const [isLiked, setIsLiked] = useState(false) // 관심 기업 여부
  const currentItem = likedCompanyList.find(
    item => item.company.code === selectedStock.code,
  )

  const handleLikeWithoutLogin = () => {
    alert('로그인이 필요한 서비스입니다.')
  }

  const handleSubscribeWithoutLike = () => {
    if (userEmail) {
      alert('이메일 구독 서비스를 위해 먼저 관심 기업으로 등록해주세요!')
    } else {
      alert('로그인이 필요한 서비스입니다.')
    }
  }

  useEffect(() => {
    setIsLiked(
      likedCompanyList.some(item => item.company.code === selectedStock.code),
    )
  }, [likedCompanyList, selectedStock])

  return (
    <s.Container>
      <s.Title>{selectedStock.companyName}</s.Title>
      <s.CodeNumber>({selectedStock.code})</s.CodeNumber>
      <s.ButtonWrap className="subscribeBtn">
        {isLiked ? (
          <Tooltip message={'관심기업에서 삭제하시겠습니까?'}>
            <s.RemoveButton onClick={handleRemoveMyStock} />
          </Tooltip>
        ) : (
          <Tooltip message={'관심기업으로 등록해보세요!'}>
            <s.AddButton
              onClick={userEmail ? handleAddMyStock : handleLikeWithoutLogin}
            />
          </Tooltip>
        )}
        {currentItem && currentItem.isSendmail ? (
          <Tooltip message={'기업을 구독중이에요! 구독을 취소하시겠습니까?'}>
            <s.SubscribingButton
              onClick={() => handleUnSubscribeCompany(selectedStock.code)}
            />
          </Tooltip>
        ) : (
          <Tooltip message={'기업의 요약 기사 메일을 받아보세요!'}>
            <s.SubscribeButton
              onClick={
                isLiked
                  ? () => handleSubscribeCompany(selectedStock.code)
                  : handleSubscribeWithoutLike
              }
            />
          </Tooltip>
        )}
      </s.ButtonWrap>
    </s.Container>
  )
}

export default MainTopSection
