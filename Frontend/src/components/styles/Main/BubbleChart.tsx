import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 650px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-lightgrey);
  border-top: 2px solid var(--color-dark);
`

export const Svg = styled.svg`
  width: 100%;
  height: 600px;
  background-color: var(--color-lightgrey);
`

export const Graph = styled.g``

export const Bubble = styled.circle``

// export const KeywordBox = styled.foreignObject<{ radius: number }>`
//   width: ${(props: { radius: number }) => props.radius * 2}px;
//   height: ${(props: { radius: number }) => props.radius * 2}px;
//   display: flex; // Flexbox를 사용하여 내부 컨텐츠 중앙 정렬
//   justify-content: center; // 가로 축에서 중앙 정렬
//   align-items: center; // 세로 축에서 중앙 정렬
//   overflow: hidden; // 버블 크기를 넘어가는 텍스트
//   cursor: pointer;
// `

export const KeywordBox = styled.foreignObject<{ radius: number }>`
  width: ${props => props.radius * 1.9}px; // padding 고려하여 크기 조정
  height: ${props => props.radius * 1.9}px; // padding 고려하여 크기 조정
  padding: 10%; // 버블 안쪽으로 내용물을 더 작게 만듭니다.
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  text-align: center;
`

export const Keyword = styled.div<{ radius: number }>`
  word-wrap: break-word;
  color: white;
  width: 100%;
  text-align: center;
  max-height: ${props => props.radius * 2}px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props: { radius: number }) => 10 + 2 ** (props.radius / 21)}px;
  /* font-size: ${props =>
    Math.min(12 + props.radius / 20, 16)}px; // 글자 크기 최대값 제한 */
  overflow: hidden;
  height: 100%;
  &:hover {
    cursor: pointer;
  }
`
