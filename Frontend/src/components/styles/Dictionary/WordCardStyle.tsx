import styled from 'styled-components'
import ClearIcon from '@mui/icons-material/Clear'

export const Card = styled.div`
  border-radius: 10px;
  /* width: 90%; */
  /* min-height: 20vh; */
  margin: 15px 10px;
  background-color: var(--color-lightgrey);
  box-shadow: var(--shadow);
`

export const CardBox = styled.div`
  padding: 20px;
  position: relative;
`

export const Title = styled.p`
  font-family: 'Galmuri11', sans-serif;
  color: var(--color-dark);
  div {
    width: 90%;
  }
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  .highlight {
    box-shadow: inset 0 -20px 0 #bfffa1;
  }
`

export const Content = styled.div`
  color: var(--color-grey);
  padding-top: 10px;
  font-size: 1.05rem;
  line-height: 1.4;
  transition: max-height 1s ease-in-out;
  max-height: auto;

  .highlight {
    color: black;
    font-weight: 700;
  }
  .none {
    max-height: 0;
    display: none;
  }
`
export const saveBtn = styled.img`
  width: 30px;
  cursor: pointer;
  margin-left: 5px;
  &:hover {
    transform: rotate(10deg);
  }
`
export const deleteBtn = styled(ClearIcon)`
  position: absolute;
  z-index: 100;
  top: 10px;
  right: 10px;
  color: var(--color-grey);
  cursor: pointer;
`
