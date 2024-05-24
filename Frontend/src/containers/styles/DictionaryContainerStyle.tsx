import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Box = styled.div`
  min-height: 80vh;
  width: 90%;
  display: flex;
  justify-content: space-between;
  border-radius: 30px;
  @media screen and (max-width: 1200px) {
  }
  @media screen and (max-width: 992px) {
    flex-direction: column;
    .searchSection {
      width: 100%;
    }
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 576px) {
  }

  /* gap: 0 5px; */
`

export const LeftWrapper = styled.div`
  width: 50%;
`
