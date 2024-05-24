import { useAtom } from 'jotai'
import { selectedCompanyAtom } from '@src/stores/stockAtom'
import { CompanyType, CompanyLatestType } from '@src/types/CompanyType'
import * as l from '@src/components/styles/Stocks/LatestStocksSectionStyle'

const LatestStocksSection = (props: { data: CompanyLatestType[] }) => {
  const { data } = props

  // const userEmail = useAtomValue(isUserEmailAtom) // 유저 이메일
  const userEmail = JSON.parse(localStorage.getItem('useremail') as string)

  const [, setSelectedStock] = useAtom(selectedCompanyAtom) // select 한 종목

  const handleClick = (item: CompanyType) => {
    setSelectedStock(item)
  }

  // 중복 제거 함수
  const removeDuplicates = (arr: CompanyLatestType[]) => {
    const seen = new Set()
    return arr.filter(item => {
      const duplicate = seen.has(item.company.code)
      seen.add(item.company.code)
      return !duplicate
    })
  }

  // 중복 제거된 데이터
  const uniqueData = data ? removeDuplicates(data) : []

  return (
    <l.Container className="latestStocks">
      <l.Title>최근 조회</l.Title>
      {userEmail ? (
        <l.Wrap>
          {uniqueData && uniqueData.length > 0 ? (
            uniqueData.map(item => (
              <l.Item key={item.crId} onClick={() => handleClick(item.company)}>
                {item.company.companyName} ({item.company.code})
              </l.Item>
            ))
          ) : (
            <l.NoneItem>최근 조회한 기업이 없습니다.</l.NoneItem>
          )}
        </l.Wrap>
      ) : (
        <l.NoneItem>로그인이 필요한 서비스입니다.</l.NoneItem>
      )}
    </l.Container>
  )
}

export default LatestStocksSection
