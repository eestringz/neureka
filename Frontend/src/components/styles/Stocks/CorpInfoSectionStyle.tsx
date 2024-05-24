import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
`

export const Title = styled.div`
  height: 3vh;
  font-size: 1rem;
  font-weight: bold;
`

export const Wrap = styled.div`
  border-top: 1px solid #000;
  display: flex;
  flex-direction: column;
`

export const Tabs = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  border-radius: 10px 10px 0 0;
  padding: 0;
  margin: 1% 0;
  font-weight: 400;

  .submenu {
    display: flex;
    width: 10%;
    padding: 1%;
    font-size: 0.9rem;
    transition: 0.5s;
  }

  .focused {
    color: deepskyblue;
    border-bottom: 1px solid deepskyblue;
  }
`

export const Content = styled.div`
  background-color: antiquewhite;
  min-height: 50vh;
`
