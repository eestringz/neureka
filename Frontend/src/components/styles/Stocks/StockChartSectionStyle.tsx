import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 1%;
  margin: 1%;

  @media screen and (max-width: 992px) {
    display: none;
  }
`
