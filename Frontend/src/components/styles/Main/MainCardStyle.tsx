import styled from 'styled-components'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

export const Wrapper = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Box = styled.div<{ bgimage: string }>`
  width: 95%;
  height: 90%;
  border-radius: 30px;

  position: relative;

  display: flex;
  flex-direction: column;
  /* z-index: 2; */
  background-image: url(${props => props.bgimage});

  background-position: center;
  background-size: cover;
  justify-content: center;

  color: white;

  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  // 스크롤 바 색상
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: var(--color-lightgrey);
  }
  // 스크롤 바 배경 색상
  &::-webkit-scrollbar-track {
    margin-top: 60px;
    margin-bottom: 60px;
    background: var(--color-dark);
  }
  // 스크롤 바 너비
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::before {
    position: absolute;
    /* z-index: 1; */
    content: '';
    border-radius: 30px;
    box-shadow: var(--shadow);
    top: 0;
    left: 0;
    width: 100%;
    height: 120%;
    background-size: cover;
    background: linear-gradient(70deg, var(--color-dark) 50%, #00000046 50%);
  }

  * {
    z-index: 2;
    font-family: 'Pretendard-Thin';
  }
`

export const Title = styled.div`
  margin-left: 3%;
  padding-top: 25%;
  margin-bottom: 20px;
  font-size: 4rem;
  width: 45%;

  &.changed {
    border-bottom: 2px solid white;
  }
`

export const Info = styled.p`
  width: 45%;
  font-size: 1.7rem;
  color: var(--color-lightgrey);
  margin-left: 3%;
  padding: 10px 0;

  opacity: 0;
  transform: translateY(30%);
  transition: all 300ms ease-in-out;

  cursor: pointer;

  &:hover {
    color: var(--color-yellow);
    font-family: 'Pretendard-Regular';
    span {
      opacity: 1;
    }
  }
  &.changed {
    opacity: 1;
    transform: translateY(0%);
  }

  span {
    opacity: 0;
  }
`

export const Arrow = styled(ArrowBackIosIcon)`
  position: absolute;
  bottom: 3%;
  left: 49%;
  font-size: 2rem !important;
  transform: rotate(-90deg);
  @keyframes blink-effect {
    50% {
      opacity: 0.2;
    }
  }
  animation: blink-effect 1300ms linear infinite;
  &.none {
    display: none;
  }
`

export const Line = styled.img`
  position: absolute;
  bottom: -5%;
  align-self: center;
  width: 22px;
`
