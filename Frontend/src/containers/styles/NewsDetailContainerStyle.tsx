import styled from 'styled-components'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import SearchIcon from '@mui/icons-material/Search'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ClearIcon from '@mui/icons-material/Clear'

export const HeaderImage = styled.div<{ bgimage: string }>`
  height: 60vh;
  background-image: url(${props => props.bgimage});
  background-size: cover;
`

export const Container = styled.div<{ $backgroundimage: string }>`
  margin: 0 10%;
  background-image: url(${props => props.$backgroundimage});
  background-size: cover;
  position: relative;

  /* background-color: var(--color-lightgrey); */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
  &::before {
    background: linear-gradient(
        -45deg,
        white 16px,
        red 16px,
        blue 16px,
        transparent 0
      ),
      linear-gradient(45deg, white 16px, transparent 0);
    background-position: left top;
    background-repeat: repeat-x;
    background-size: 15px 32px;
    content: ' ';
    display: block;

    height: 32px;
    width: 100%;

    position: absolute;
    bottom: 0;
    left: 0;
  }

  @media screen and (max-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`

export const PlusBtn = styled.span`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 20px;

  right: 3%;
  bottom: 5%;
  background-color: var(--color-grey);
`

export const GoMoreBtn = styled.span`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 15px;
  position: fixed;
  z-index: 200;

  right: 0%;
  bottom: 5%;
  background-color: var(--color-grey);

  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: var(--shadow);

  &:hover {
    cursor: pointer;
  }
`

export const SelectBox = styled.div`
  background-color: var(--color-grey);
  position: fixed;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;

  bottom: 5%;
  right: 0%;
  width: 200px;
  height: 100px;
  transform: translateX(100%);
  transition: transform 500ms ease-in-out;
  &.show {
    transform: translateX(0%);
  }
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`
export const Select = styled.p`
  color: white;
  border-radius: 10px;
  padding: 5px;
  margin-left: 20px;
  &:nth-child(1) {
    margin-bottom: 10px;
  }

  cursor: pointer;
  transform: translateY(0);
  transition: transform 200ms ease-in-out;
  &:hover {
    transform: translateY(-5%);
  }
`

export const More = styled(MoreHorizIcon)`
  color: var(--color-lightblue);
  font-size: 2rem !important;
`

export const Back = styled(ArrowForwardIosIcon)`
  color: var(--color-lightblue);
  font-size: 1rem !important;
`

export const Clear = styled(ClearIcon)`
  color: var(--color-lightblue);
  font-size: 2rem !important;
`

export const Search = styled(SearchIcon)`
  color: var(--color-lightblue);
  font-size: 2.3rem !important;
`

export const SearchSection = styled.div`
  position: fixed;
  z-index: 100;
  width: 21vw;
  top: 60%;
  height: 30vh;
  right: 0%;
  transform: translate(100%, -50%);
  transition: transform 400ms ease-in-out;
  opacity: 0.95;
  > div {
    box-shadow: var(--shadow);
  }
  &.show {
    transform: translate(0%, -50%);
  }
  div {
    font-size: 0.9rem;
  }
`

export const TTSSection = styled.div`
  position: fixed;
  z-index: 100;
  width: 18vw;
  height: 50vh;
  background-color: var(--color-lightblue);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  box-shadow: var(--shadow);
  opacity: 0.8;
  top: 70%;
  right: 0%;
  transform: translate(100%, -50%);
  transition: transform 400ms ease-in-out;
  &.show {
    transform: translate(0%, -50%);
  }
`
