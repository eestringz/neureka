import styled from 'styled-components'

export const SlideWrapper = styled.div`
  height: 8vh;
  width: 100%;
  background-color: var(--color-navy);
  align-items: center;
  overflow: hidden;
  cursor: default;
  @keyframes infiniteAnimation1 {
    0% {
      transform: translateX(0%);
    }
    50% {
      transform: translateX(-100%);
    }
    50.1% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
  @keyframes infiniteAnimation2 {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-200%);
    }
  }
`

export const SlideBox = styled.div`
  width: 200%;
  height: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
`

export const SlideText = styled.div`
  display: inline-block;
  color: white;
  /* font-family: 'SEBANG_Gothic_Regular'; */
  /* font-family: 'Bebas Neue', sans-serif; */
  font-family: 'IBM Plex Sans Condensed', sans-serif;
  font-weight: 100;

  font-size: 2.5rem;
  /* font-style: italic; */
  margin: 0 15px;
`

export const SlideOriginal = styled.div`
  animation: 170s linear infinite normal none running infiniteAnimation1;
`

export const SlideClone = styled.div`
  animation: 170s linear infinite infiniteAnimation2;
`
