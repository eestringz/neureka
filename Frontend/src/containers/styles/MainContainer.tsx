import styled from 'styled-components'

export const container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const NewsWrapper = styled.div`
  margin-top: -3px;
  width: 85%;
  display: flex;
  justify-content: center;
  /* border: 1px solid black; */
  border-top: 3px solid var(--color-dark);
  border-bottom: 3px solid var(--color-dark);
  min-height: 200px;
`

export const TutorialWrapper = styled.div`
  width: 100%;
`

export const BubbleCategoryWrapper = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const BubbleChartWrapper = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
