import styled from 'styled-components'

interface ColorProps {
  isPositiveChange: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  align-items: center;
`

export const InfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 15vh;
  padding: 2% 3%;
  border: 2px solid #ccc;
`

export const LeftWrap = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`

export const LeftTopWrap = styled.div<ColorProps>`
  flex: 3;
  display: flex;
  align-items: center;
  font-size: 2.3rem;
  color: ${({ isPositiveChange }) => (isPositiveChange ? 'red' : 'blue')};
`

export const LeftBottomWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2%;
  gap: 5px;
`

export const RightWrap = styled.div`
  flex: 5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 2%;
`

export const RightInnerWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const RightItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

export const ItemTitle = styled.span`
  font-size: 0.8rem;
`
export const ItemNumber = styled.span`
  font-size: 1.3rem;
`
export const ItemPercentage = styled.span<ColorProps>`
  font-size: 0.8rem;
  color: ${({ isPositiveChange }) => (isPositiveChange ? 'red' : 'blue')};
`

export const Icon = styled.img`
  width: 10px;
  height: 12px;
`

export const LeftBottomNumber = styled.span<ColorProps>`
  font-size: 1.2rem;
  color: ${({ isPositiveChange }) => (isPositiveChange ? 'red' : 'blue')};
`

export const ColorNumber = styled.span<ColorProps>`
  font-size: 1.3rem;
  color: ${({ isPositiveChange }) => (isPositiveChange ? 'red' : 'blue')};
`
