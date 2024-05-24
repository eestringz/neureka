import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
  withDeviceRatio,
  withSize,
} from 'react-financial-charts'
import { CompanyPriceType } from '@src/types/CompanyType'
import * as c from '@src/components/styles/Stocks/StockChartSectionStyle'

const StockChartSection = (props: { initialData: CompanyPriceType[] }) => {
  const { initialData } = props

  // 화면 크기를 조정해보려다가 실패함
  // const [canvasSize, setCanvasSize] = useState({ width: 900, height: 500 })

  // useEffect(() => {
  //   const handleResize = () => {
  //     setCanvasSize({
  //       width: window.innerWidth * 0.8,
  //       height: window.innerHeight * 0.6,
  //     })
  //   }
  //   // 컴포넌트가 마운트될 때와 창 크기가 변경될 때 이벤트 리스너를 추가합니다.
  //   window.addEventListener('resize', handleResize)
  //   return () => window.removeEventListener('resize', handleResize)
  // }, [])

  // const height = canvasSize.height
  // const width = canvasSize.width

  const height = 500
  const width = 900

  const margin = { left: 0, right: 60, top: 0, bottom: 24 }

  const ScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor(
      d => new Date(d.date),
    )

  const { data, xScale, xAccessor, displayXAccessor } =
    ScaleProvider(initialData)

  const ema12 = ema()
    .id(1)
    .options({ windowSize: 12 })
    .merge((d: CompanyPriceType, c: number) => {
      d.ema12 = c
    })
    .accessor((d: CompanyPriceType) => d.ema12)

  const ema26 = ema()
    .id(1)
    .options({ windowSize: 26 })
    .merge((d: CompanyPriceType, c: number) => {
      d.ema26 = c
    })
    .accessor((d: CompanyPriceType) => d.ema26)

  // Elder Ray 계산
  const elder = elderRay()

  const calculatedData = elder(ema26(ema12(initialData)))

  const pricesDisplayFormat = format('.0f')
  const dateTimeFormat = '%Y-%b-%d'
  const timeDisplayFormat = timeFormat(dateTimeFormat)

  const max = xAccessor(data[data.length - 1])
  const min = xAccessor(data[Math.max(0, data.length - 100)])
  const xExtents = [min, max + 5]

  const gridHeight = height - margin.top - margin.bottom
  const elderRayHeight = 100
  const barChartHeight = gridHeight / 4
  const chartHeight = gridHeight - elderRayHeight

  const elderRayOrigin = (_: any, h: number) => [0, h - elderRayHeight]
  const barChartOrigin = (_: any, h: number) => [
    0,
    h - barChartHeight - elderRayHeight,
  ]

  const yExtents = (data: CompanyPriceType) => {
    return [data.high, data.low]
  }

  const barChartExtents = (data: CompanyPriceType) => {
    return data.volume
  }

  const candleChartExtents = (data: CompanyPriceType) => {
    return [data.high, data.low]
  }

  const yEdgeIndicator = (data: CompanyPriceType) => {
    return data.close
  }

  const volumeColor = (data: CompanyPriceType) => {
    return data.close > data.open
      ? 'rgba(38, 166, 154, 0.3)'
      : 'rgba(239, 83, 80, 0.3)'
  }

  const volumeSeries = (data: CompanyPriceType) => {
    return data.volume
  }

  const openCloseColor = (data: CompanyPriceType) => {
    return data.close > data.open ? '#26a69a' : '#ef5350'
  }

  return (
    <c.Container>
      <ChartCanvas
        height={height}
        ratio={3}
        width={width}
        margin={margin}
        data={data}
        displayXAccessor={displayXAccessor}
        seriesName="Data"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
      >
        {/* 캔들차트 */}
        <Chart id={1} height={chartHeight} yExtents={candleChartExtents}>
          <XAxis showGridLines showTickLabel={false} />
          <YAxis showGridLines tickFormat={pricesDisplayFormat} />
          <CandlestickSeries />
          {/* EMA12 차트 */}
          <LineSeries
            yAccessor={ema12.accessor()}
            strokeStyle={ema12.stroke()}
          />
          <CurrentCoordinate
            yAccessor={ema12.accessor()}
            fillStyle={ema12.stroke()}
          />
          {/* EMA26 차트 */}
          <LineSeries
            yAccessor={ema26.accessor()}
            strokeStyle={ema26.stroke()}
          />
          <CurrentCoordinate
            yAccessor={ema26.accessor()}
            fillStyle={ema26.stroke()}
          />
          <MouseCoordinateX displayFormat={timeDisplayFormat} />
          <MouseCoordinateY
            rectWidth={margin.right}
            displayFormat={pricesDisplayFormat}
          />

          {/* 제일 오른쪽 끝에 있는 값의 시가 */}
          <EdgeIndicator
            itemType="last"
            rectWidth={margin.right}
            fill={openCloseColor}
            lineStroke={openCloseColor}
            displayFormat={pricesDisplayFormat}
            yAccessor={yEdgeIndicator}
          />
          <MovingAverageTooltip
            origin={[8, 24]}
            options={[
              {
                yAccessor: ema26.accessor(),
                type: 'EMA',
                stroke: ema26.stroke(),
                windowSize: ema26.options().windowSize,
              },
              {
                yAccessor: ema12.accessor(),
                type: 'EMA',
                stroke: ema12.stroke(),
                windowSize: ema12.options().windowSize,
              },
            ]}
          />
          <ZoomButtons />
          <OHLCTooltip origin={[8, 16]} />
        </Chart>

        {/* 거래량 차트 */}
        <Chart
          id={2}
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={barChartExtents}
        >
          <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
        </Chart>

        {/* elder ray 차트 */}
        <Chart
          id={3}
          height={elderRayHeight}
          yExtents={[0, elder.accessor()]}
          origin={elderRayOrigin}
          padding={{ top: 8, bottom: 8 }}
        >
          <ElderRaySeries yAccessor={elder.accessor()} />
          <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
          <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
          <MouseCoordinateX displayFormat={timeDisplayFormat} />
          <MouseCoordinateY
            rectWidth={margin.right}
            displayFormat={pricesDisplayFormat}
          />
          <SingleValueTooltip
            yAccessor={elder.accessor()}
            yLabel="Elder Ray"
            yDisplayFormat={d =>
              `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(d.bearPower)}`
            }
            origin={[8, 16]}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    </c.Container>
  )
}

export default StockChartSection
