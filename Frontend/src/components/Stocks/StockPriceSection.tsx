import { CompanyPriceType } from '@src/types/CompanyType'
import * as s from '@src/components/styles/Stocks/StockPriceSectionStyle'

const StockPriceSection = (props: { data: CompanyPriceType[] }) => {
  const { data } = props
  const lastItem = data[data.length - 1]
  const changePercentage = ((lastItem?.change || 0) * 100).toFixed(2)
  const isPositiveChange = lastItem.close - data[data.length - 2].close > 0

  return (
    <s.Container>
      <s.InfoWrap className="stockInfo">
        <s.LeftWrap>
          <s.LeftTopWrap isPositiveChange={isPositiveChange}>
            {lastItem.close.toLocaleString()}
          </s.LeftTopWrap>
          <s.LeftBottomWrap>
            <s.ItemTitle>전일대비</s.ItemTitle>
            {isPositiveChange ? (
              <s.Icon src="/image/redvector.png" />
            ) : (
              <s.Icon src="/image/bluevector.png" />
            )}
            <s.LeftBottomNumber isPositiveChange={isPositiveChange}>
              {Math.abs(
                lastItem.close - data[data.length - 2].close,
              ).toLocaleString()}
            </s.LeftBottomNumber>
            <s.ItemPercentage isPositiveChange={isPositiveChange}>
              {changePercentage}%
            </s.ItemPercentage>
          </s.LeftBottomWrap>
        </s.LeftWrap>
        <s.RightWrap>
          <s.RightInnerWrap>
            <s.RightItem>
              <s.ItemTitle>전일</s.ItemTitle>
              <s.ItemNumber>
                {data[data.length - 2].close.toLocaleString()}
              </s.ItemNumber>
            </s.RightItem>
            <s.RightItem>
              <s.ItemTitle>시가</s.ItemTitle>
              <s.ColorNumber isPositiveChange={isPositiveChange}>
                {lastItem.open.toLocaleString()}
              </s.ColorNumber>
            </s.RightItem>
          </s.RightInnerWrap>
          <s.RightInnerWrap>
            <s.RightItem>
              <s.ItemTitle>고가</s.ItemTitle>
              <s.ColorNumber isPositiveChange={isPositiveChange}>
                {lastItem.high.toLocaleString()}
              </s.ColorNumber>
            </s.RightItem>
            <s.RightItem>
              <s.ItemTitle>저가</s.ItemTitle>
              <s.ColorNumber isPositiveChange={isPositiveChange}>
                {lastItem.low.toLocaleString()}
              </s.ColorNumber>
            </s.RightItem>
          </s.RightInnerWrap>
          <s.RightInnerWrap>
            <s.RightItem>
              <s.ItemTitle>거래량</s.ItemTitle>
              <s.ItemNumber>{lastItem.volume.toLocaleString()}</s.ItemNumber>
            </s.RightItem>
            <s.RightItem>
              <s.ItemTitle>거래대금</s.ItemTitle>
              <s.ItemNumber>
                {(lastItem.volume * lastItem.close).toLocaleString()}
              </s.ItemNumber>
            </s.RightItem>
          </s.RightInnerWrap>
        </s.RightWrap>
      </s.InfoWrap>
    </s.Container>
  )
}

export default StockPriceSection
