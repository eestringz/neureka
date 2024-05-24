import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

export const SearchBox = styled.div`
  height: 40px;
  margin-top: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
`

export const SearchBar = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 0 3%;
  border-radius: 10px;
  box-shadow: inset 0.5px 0.5px 2px 0.5px #e2e2e2;
`

export const SearchInput = styled.input`
  width: 100%;
  height: 90%;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  text-align: end;
`

export const SearchButton = styled(SearchIcon)`
  border-radius: 10px;
  font-size: 1.3em !important;
  aspect-ratio: 1;
  height: 1.3em !important;
  width: 1.3em !important;
  padding: 1%;
  color: var(--color-dark);
  cursor: pointer;
`

export const ClearButton = styled(ClearIcon)`
  border-radius: 10px;
  font-size: 1.3em !important;
  aspect-ratio: 1;
  height: 1.3em !important;
  width: 1.3em !important;
  padding: 1%;
  color: var(--color-dark);
  cursor: pointer;
`
