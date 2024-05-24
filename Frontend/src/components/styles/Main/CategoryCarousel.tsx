import styled from 'styled-components'
import ClearIcon from '@mui/icons-material/Clear'

export const CarouselWrapper = styled.div`
  width: 100%;
  /* margin: auto; */
  display: flex;
  justify-content: center;

  .swiper-button-next,
  .swiper-button-prev {
    color: #000;
  }

  .swiper-slide {
    /* width: 100px !important; */
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: transform 0.3s ease; // 변환(확대) 애니메이션
    &:hover {
      transform: scale(1.1); // 마우스 호버 시 아이콘 확대
      cursor: pointer;
    }
  }
  .swiper-horizontal {
    width: 100%;
  }
`

export const Icon = styled.img`
  width: 75px;
  height: 75px;
  cursor: pointer;
`

export const Category = styled.div`
  width: 100px;
  height: 30px;
  text-align: center;
  font-size: 1.1rem;
`
export const ErrorAlert = styled.div`
  background-color: var(--color-lightblue);
  font-size: 1rem;
  border-radius: 7px;
  position: fixed;
  z-index: 10000;
  left: 50%;
  top: 30%;
  &.none {
    display: none;
    opacity: 0;
    transform: translate(-50%, -100%);
    transition: all 300ms ease-in-out;
  }
  width: 30vw;
  height: 50px;
  box-shadow: var(--shadow);
  align-items: center;
  justify-content: center;

  &.error {
    display: flex;
    transform: translate(-50%, 0%);
    opacity: 1;
  }
`

export const Clear = styled(ClearIcon)`
  cursor: pointer;
  color: var(--color-grey);
  &:hover {
    transform: scale(1.1);
    color: black;
  }
  position: absolute;
  right: 10px;
`
export const AlertIcon = styled.img`
  height: 25px;
  margin-right: 5px;
`
