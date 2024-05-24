import { useEffect, useState } from 'react'
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride'
import {
  AddButton,
  RemoveButton,
} from '@src/components/styles/Stocks/MainTopSectionStyle'

const StockTutorial = () => {
  const [shouldRunTutorial, setShouldRunTutorial] = useState(true)
  const [run, setRun] = useState(true)
  const [steps, setSteps] = useState<Step[]>([
    {
      disableBeacon: true,
      title: '검색기준 선택',
      target: '.selectNorm',
      content: '검색기준을 선택할 수 있습니다.',
    },
    {
      title: '검색',
      target: '.search',
      content: '검색기준에 따라 주식 종목을 검색할 수 있습니다.',
    },
    {
      title: '내 관심 종목',
      target: '.myStock',
      content: '내가 찜한 종목을 볼 수 있습니다.',
    },
    {
      title: '최근 조회 종목',
      target: '.latestStocks',
      content: '최근 조회한 종목을 볼 수 있습니다.',
    },
    {
      title: '관심종목 / 뉴스레터 구독',
      target: '.subscribeBtn',
      content: '관심 종목을 추가하거나 제거할 수 있습니다.',
    },
    {
      title: '주식 정보',
      target: '.stockInfo',
      content:
        '현재가, 전일종가, 시가, 고가, 저가, 거래량 등 당일 주식 정보를 확인할 수 있습니다.',
    },
    {
      title: '캔들차트',
      target: '#chart_1',
      content: '날짜별 종목의 시가, 종가, 최고가, 최저가를 확인할 수 있습니다.',
    },
    {
      title: '거래량 차트',
      target: '#chart_3',
      content: '날짜별 종목의 거래량을 확인할 수 있습니다.',
    },
    {
      title: '종목 최근 뉴스',
      target: '.stockNews',
      content: '해당 종목의 최근 이슈를 확인 할 수 있습니다.',
    },
    // 기타 등등 스텝 추가 가능
  ])

  useEffect(() => {
    const hasStocksTutorial = sessionStorage.getItem('hasStocksTutorial')
    if (hasStocksTutorial) {
      setShouldRunTutorial(false) // 이미 실행했다면 튜토리얼을 실행하지 않음
    }
  }, [])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      // 투어가 완료되거나 스킵되었을 때 sessionStorage에 상태 저장
      sessionStorage.setItem('hasStocksTutorial', 'true')
      setShouldRunTutorial(false) // 튜토리얼 실행을 멈춤
    }
  }

  return (
    <Joyride
      continuous
      spotlightClicks
      disableOverlayClose
      scrollOffset={200}
      run={shouldRunTutorial}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
    />
  )
}

export default StockTutorial
