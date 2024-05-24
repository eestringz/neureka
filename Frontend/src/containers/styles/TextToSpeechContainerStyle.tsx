import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  background-color: var(--color-lightblue);
`

export const Title = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10%;
`

export const Setting = styled.div`
  margin-bottom: 8%;
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: 5%;
  }
`
