import { Sentiment } from '@src/types/MainType'
import * as s from '@src/components/styles/Main/SentimentTooltip.tsx'
import { useAtom } from 'jotai'
import { selectedKeywordAtom } from '@src/stores/mainAtom'
type Props = {
  sentiments: Sentiment[]
}

const SentimentTooltip = ({ sentiments }: Props) => {
  const [selectedKeyword] = useAtom(selectedKeywordAtom)
  const getStyleAndLabel = (sentiment: Sentiment) => {
    switch (sentiment.label) {
      case 'positive':
        return { color: '#3f7beb', label: '긍정' }
      case 'negative':
        return { color: '#eb533f', label: '부정' }
      case 'neutral':
        return { color: 'grey', label: '중립' }
      default:
        return { color: 'black', label: sentiment.label }
    }
  }

  // 가장 높은 score를 가진 sentiment 찾기
  const highestSentiment = sentiments.reduce((prev, current) => {
    return prev.score > current.score ? prev : current
  })

  // 해당 sentiment에 따른 스타일과 레이블 가져오기
  const { color, label } = getStyleAndLabel(highestSentiment)

  return (
    <s.Wrapper>
      {/* {sentiments.map((sentiment, index) => {
        const { color, label } = getStyleAndLabel(sentiment)
        return (
          <s.Sentiment key={index} $color={color}>
            <strong>{label}</strong>: {sentiment.score.toFixed(2)}
          </s.Sentiment>
        )
      })} */}
      <s.Sentiment $color={color}>
        이 기사는 <strong>{label}</strong>적인 기사입니다.
      </s.Sentiment>
    </s.Wrapper>
  )
}

export default SentimentTooltip
