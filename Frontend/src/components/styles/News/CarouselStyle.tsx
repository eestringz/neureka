import styled from 'styled-components'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import StopIcon from '@mui/icons-material/Stop'

export const Wrapper = styled.div`
  overflow: hidden;
  display: flex;
  /* width: 50%; */
  /* margin: 0 10%; */
  justify-content: center;
  flex-direction: column;
  position: relative;
  @media screen and (max-width: 992px) {
    .carousel {
      height: auto;
    }
    .carousel-item {
      .title {
        font-size: 1rem;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .carousel {
    }
    .carousel-item {
      img {
        display: none;
      }
      .info {
        display: none;
      }
    }
  }
  @media screen and (max-width: 576px) {
    .carousel {
    }
  }
`

export const Container = styled.div`
  height: auto;
  width: 40vw;
`

export const Slides = styled.div`
  z-index: 1;
  display: flex;
  transition: transform 0.5s ease;
  height: 100%;
`

export const Slide = styled.div`
  background-color: transparent;
`

export const PrevButton = styled(ArrowLeftIcon)`
  background-color: transparent;
  border: none;
  position: absolute;
  z-index: 5;
  left: 0;
  color: var(--color-dark);
`
export const NextButton = styled(ArrowRightIcon)`
  background-color: transparent;
  border: none;
  position: absolute;
  z-index: 10;
  right: 0;
  color: var(--color-dark);
`

export const IndexBox = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  .focused_card {
    color: var(--color-navy);
  }
`

export const CardIndex = styled(StopIcon)`
  font-size: 1rem !important;
  color: var(--color-grey);
`

export const CarouselCard = styled.div<{ bgimage: string }>`
  width: 40vw;

  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 0;
  cursor: pointer;
`
export const CarouselContent = styled.div`
  background-color: #00000013;
  height: 90%;
  margin: 20px;
  padding: 15px 0;
  position: relative;
  &:hover .title {
    font-weight: 600;
    /* color: black; */
  }
`

export const HeadLine = styled.p`
  /* background-color: var(--color-navy); */
  /* color: white; */
  /* width: 90%; */
  margin: 0 30px;
  margin-bottom: 2%;
  /* position: absolute; */
  /* top: 10%;
  left: 0; */
  font-size: 1.3rem;
`
export const Info = styled.p`
  font-size: 1rem;
  width: 100%;
  display: flex;
  justify-content: end;
  /* align-self: end; */
  position: absolute;
  bottom: 10px;
  /* width: 100%; */
  /* background-color: #00000094; */
`
export const Date = styled.span`
  color: var(--color-grey);
`
export const Press = styled.span`
  color: var(--color-blue);
  font-weight: 700;
  margin: 0 10px;
`

export const Thumbnail = styled.img`
  width: 50%;
  aspect-ratio: 2;
  object-fit: cover;
  margin-left: 30px;
  margin-bottom: 20px;
`
