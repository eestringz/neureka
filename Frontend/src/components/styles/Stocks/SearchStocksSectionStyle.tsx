import styled from 'styled-components'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

export const Container = styled.div`
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  margin: 3%;
  padding: 3%;

  > * {
    margin-bottom: 5%;
  }
`

export const Title = styled.p`
  color: var(--color-dark);
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 20px;
  flex: 0 0 auto;
`

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`

export const SelectBox = styled.select`
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

export const SearchInput = styled.input`
  background-color: #f8f9ff;
  flex: 1;
  padding: 5px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 0.8rem;
`

export const ResultWrap = styled.div`
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`

export const ResultItem = styled.li`
  display: flex;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid #ccc;
  font-size: 0.8rem;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: blue;
    cursor: pointer;
  }

  & > span:first-child {
    flex: 1;
    margin-right: 5px;
  }

  & > span:last-child {
    margin-left: 5px;
  }
`

export const ArrowIcon = styled(ArrowOutwardIcon)`
  font-size: 0.9rem !important;
`

export const SearchIcon = styled(SearchOutlinedIcon)`
  font-size: 1.1rem !important;
`
