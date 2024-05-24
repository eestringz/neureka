import { useAtom } from 'jotai'
import { selectedCompanyAtom } from '@src/stores/stockAtom'
import { CompanyType, CompanyLikeType } from '@src/types/CompanyType'
import Tooltip from '@src/common/Tooltip'
import * as m from '@src/components/styles/Stocks/MyStocksSectionStyle'

const MyStocksSection = (props: {
  data: CompanyLikeType[]
  handleSubscribeCompany: (code: string) => void
  handleUnSubscribeCompany: (code: string) => void
}) => {
  const { data, handleSubscribeCompany, handleUnSubscribeCompany } = props

  // const userEmail = useAtomValue(isUserEmailAtom) // 유저 이메일
  const userEmail = JSON.parse(localStorage.getItem('useremail') as string)
  const [, setSelectedStock] = useAtom(selectedCompanyAtom) // select 한 종목

  const handleClick = (item: CompanyType) => {
    setSelectedStock(item)
  }

  return (
    <m.Container className="myStock">
      <m.Title>MY STOCK</m.Title>
      {userEmail ? (
        <m.Wrap>
          {data && data.length > 0 ? (
            data.map(item => (
              <m.Item key={item.company.companyId}>
                <m.CompanyInfo onClick={() => handleClick(item.company)}>
                  {item.company.companyName} ({item.company.code})
                </m.CompanyInfo>
                {item.isSendmail ? (
                  <Tooltip
                    message={'기업을 구독중이에요! 구독을 취소하시겠습니까?'}
                  >
                    <m.SubscribingButton
                      onClick={() =>
                        handleUnSubscribeCompany(item.company.code)
                      }
                    />
                  </Tooltip>
                ) : (
                  <Tooltip message={'기업의 요약 기사 메일을 받아보세요!'}>
                    <m.SubscribeButton
                      onClick={() => handleSubscribeCompany(item.company.code)}
                    />
                  </Tooltip>
                )}
              </m.Item>
            ))
          ) : (
            <m.NoneItem>관심 기업을 등록하세요!</m.NoneItem>
          )}
        </m.Wrap>
      ) : (
        <m.NoneItem>로그인이 필요한 서비스입니다.</m.NoneItem>
      )}
    </m.Container>
  )
}

export default MyStocksSection
