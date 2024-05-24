import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { selectedNewsListAtom } from '@src/stores/stockAtom'
import Loading from '@src/common/Loading'
import * as s from '@src/components/styles/Stocks/StockNewsSectionStyle'

const StockNewsSection = () => {
  const [selectedNewsList] = useAtom(selectedNewsListAtom) // 기업 뉴스 리스트

  const navigate = useNavigate()
  const handleNewsDetail = (link: string) => {
    navigate(`/news/newsdetail/${link}`)
  }
  return (
    <s.Container className="stockNews">
      <s.Title>최근 뉴스</s.Title>
      <s.Wrap>
        {selectedNewsList.length > 0 ? (
          selectedNewsList.map((item, index) => (
            <s.Item key={index} onClick={() => handleNewsDetail(item._id)}>
              <s.ItemBox>
                <s.ItemInfo>
                  <s.ItemPublisher>{item.press}</s.ItemPublisher>
                  <s.ItemDate>{item.article_date}</s.ItemDate>
                </s.ItemInfo>
                <s.ItemTitle>{item.title}</s.ItemTitle>
                <s.ItemContent>{item.summary}</s.ItemContent>
              </s.ItemBox>
              {item.thumbnail_url && (
                <s.ItemImage src={item.thumbnail_url} alt="image" />
              )}
            </s.Item>
          ))
        ) : (
          <Loading />
        )}
      </s.Wrap>
    </s.Container>
  )
}

export default StockNewsSection
