import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { useAtom } from 'jotai'
import * as b from '@src/components/styles/Main/BubbleChart'
import { Bubble, KeywordCount } from '@src/types/MainType'
import { selectedKeywordAtom } from '@src/stores/mainAtom'

export type BubbleChartProps = {
  keywords: KeywordCount[]
}

const BubbleChart = ({ keywords }: BubbleChartProps) => {
  const [selectedKeyword, setSelectedKeyword] = useAtom(selectedKeywordAtom)
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [selectedBubbleId, setSelectedBubbleId] = useState<number | null>(null)
  const [width, setWidth] = useState(window.innerWidth * 0.8)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const maxCount = Math.max(...keywords.map(keyword => keyword.count))
  const defaultBubbleSize = 80

  const handleMouseOver = (id: number) => {
    setSelectedBubbleId(id)
  }

  const handleMouseLeave = () => {
    setSelectedBubbleId(null)
  }

  const dy = [1, 1, -1, -1, 1, 0, -1, 0]
  const dx = [1, -1, -1, 1, 0, 1, 0, -1]

  const getColorForId = (id: number) => {
    if (id % 5 == 0) return '#FFA500'
    else if (id % 5 == 1) return '#21F2D9'
    else if (id % 5 == 2) return '#007EC5'
    else if (id % 5 == 3) return '#EE8273'
    return '#B5C9F0'
  }

  const handleSelectKeyword = (keyword: string) => {
    const keywordInfo = keywords.find(k => k.keyword === keyword)
    if (keywordInfo === undefined) {
      setSelectedKeyword({ keyword: '', count: 0, ids: [] })
    } else {
      setSelectedKeyword(keywordInfo)
    }
  }

  const simulationRef = useRef<d3.Simulation<Bubble, undefined> | null>(null)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth * 0.8)
    }

    window.addEventListener('resize', handleResize)

    // 이벤트 리스너 정리
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const scaledBubbles = keywords.map((keyword, index) => ({
      id: index,
      x: width / 2 + 5 * (index / 8) * dy[index % 8],
      y: 300 + 5 * (index / 8) * dx[index % 8],
      r:
        defaultBubbleSize * (1 / 3 + ((keyword.count / maxCount) * 2) / 3) + 10,
      name: keyword.keyword,
    }))

    simulationRef.current = d3
      .forceSimulation(scaledBubbles)
      .force('charge', d3.forceManyBody().strength(200))
      .force('center', d3.forceCenter(width / 2, 300)) // 중앙으로 이동하는 힘
      .force(
        'collision',
        d3.forceCollide().radius((d: any) => (d as Bubble).r + 5),
      )
      .on('tick', () => {
        // SVG 영역 내에서 각 버블의 위치 조정
        scaledBubbles.forEach(bubble => {
          bubble.x = Math.max(
            bubble.r * 1.1,
            Math.min(width - bubble.r * 1.1, bubble.x),
          )
          bubble.y = Math.max(
            bubble.r * 1.1,
            Math.min(600 - bubble.r * 1.1, bubble.y),
          )
        })

        setBubbles([...scaledBubbles])
      })
  }, [keywords, width])

  useEffect(() => {
    if (!svgRef.current) return
    const svg = d3.select('.BubbleChart').select('svg')

    const selectedbubbles = svg
      .selectAll('circle')
      .data<Bubble>(bubbles)
      .enter()
      .append('circle')
      .attr('r', d => d.r)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .style('fill', d => getColorForId(d.id))

    // 마우스 이벤트 리스너 추가
    selectedbubbles
      .on('mouseover', function (event, d) {
        const selectedBubble = d3.select(this)
        selectedBubble
          .transition()
          .duration(200)
          .attr('r', d.r * 1.2)
      })
      .on('mouseleave', (event, d) => {
        const selectedBubble = d3.select(event.currentTarget)
        selectedBubble.transition().duration(200).attr('r', d.r)
      })
  }, [keywords])

  return (
    <>
      <b.Container className="BubbleChart">
        <b.Svg>
          {bubbles.map(bubble => (
            <b.Graph
              key={bubble.id}
              transform={`translate(${bubble.x}, ${bubble.y})`}
              onClick={() => handleSelectKeyword(bubble.name)}
              onMouseOver={() => handleMouseOver(bubble.id)}
              onMouseLeave={handleMouseLeave}
            >
              <b.Bubble
                r={selectedBubbleId === bubble.id ? bubble.r * 1.1 : bubble.r}
                fill={getColorForId(bubble.id)}
              />
              <b.KeywordBox
                radius={bubble.r}
                x={-bubble.r * 0.95}
                y={-bubble.r * 0.95}
              >
                <b.Keyword radius={bubble.r}>
                  {bubble.name.length <= 12
                    ? bubble.name
                    : bubble.name.slice(0, 11) + '...'}
                </b.Keyword>
              </b.KeywordBox>
            </b.Graph>
          ))}
        </b.Svg>
      </b.Container>
    </>
  )
}

export default BubbleChart
