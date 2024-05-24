import styled from 'styled-components'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Title = styled.div`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 5%;
`

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const CustomSelect = styled.select`
  appearance: none;
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  text-overflow: ellipsis;
  white-space: nowrap;

  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #4d89f9;
  }
`

export const ArrowIcon = styled(ExpandMoreIcon)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 1; /* 선택상자 위에 아이콘이 오도록 설정 */
`

export const Option = styled.option`
  font-size: 0.9rem;
`
