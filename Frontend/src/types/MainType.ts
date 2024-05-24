import semiconductor from '/category/semiconductor.gif'
import finance from '/category/finance.gif'
import technology from '/category/technology.gif'
import management from '/category/management.gif'
import cryptocurrency from '/category/cryptocurrency.gif'
import stock from '/category/stock.gif'
import politics from '/category/politics.gif'
import global from '/category/global.gif'
import semiconductorStatic from '/category/semiconductor-static.png'
import financeStatic from '/category/finance-static.png'
import technologyStatic from '/category/technology-static.png'
import managementStatic from '/category/management-static.png'
import cryptocurrencyStatic from '/category/cryptocurrency-static.png'
import stockStatic from '/category/stock-static.png'
import politicsStatic from '/category/politics-static.png'
import globalStatic from '/category/global-static.png'

export const Categories = [
  { name: '반도체', image: semiconductor, imageStatic: semiconductorStatic },
  { name: '금융', image: finance, imageStatic: financeStatic},
  { name: '기술', image: technology, imageStatic: technologyStatic},
  { name: '경영', image: management, imageStatic: managementStatic },
  { name: '가상화폐', image: cryptocurrency, imageStatic: cryptocurrencyStatic },
  { name: '유가증권', image: stock, imageStatic: stockStatic },
  { name: '정치', image: politics, imageStatic: politicsStatic },
  { name: '해외토픽', image: global, imageStatic: globalStatic },
]

export type Category = {
  name: string
  image: string
  imageStatic: string
}

export type KeywordCount = {
  keyword: string
  count: number
  ids: string[]
}

export type Bubble = d3.SimulationNodeDatum & {
  id: number;
  x: number;
  y: number;
  r: number;
  name: string;
}

export type CategoryBoxProps = {
  $show: boolean; // boolean에서 string으로 변경
}

export type KeywordNews = {
  _id: string
  message: string
  thumbnail_url: string
  article_title: string
  article_link: string
  article_summary: string
  press: string
  date_time: string
  keyword: string[]
  topic: string
  sentiment: Sentiment[]
}

export type Sentiment = {
  label: string
  score: number
}