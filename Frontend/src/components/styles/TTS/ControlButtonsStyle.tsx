import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const PlayButton = styled.button`
  background-color: #4d89f9;
  color: #ffffff;
  padding: 3%;
  border: 1px solid #ffffff;
  border-radius: 5px;
  width: 100%;
  font-size: 0.9rem;

  &:hover {
    background-color: #3578e5; /* 호버 시 색상 변경 */
    cursor: pointer; /* 호버 시 커서 모양 변경 */
  }
`

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`

export const PauseButton = styled.button`
  background-color: #4d89f9;
  color: #ffffff;
  padding: 2%;
  border: 1px solid #ffffff;
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;

  &:hover {
    background-color: #3578e5; /* 호버 시 색상 변경 */
    cursor: pointer; /* 호버 시 커서 모양 변경 */
  }
`

export const StopButton = styled.button`
  background-color: #4d89f9;
  color: #ffffff;
  padding: 2%;
  border: 1px solid #ffffff;
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;

  &:hover {
    background-color: #3578e5; /* 호버 시 색상 변경 */
    cursor: pointer; /* 호버 시 커서 모양 변경 */
  }
`
