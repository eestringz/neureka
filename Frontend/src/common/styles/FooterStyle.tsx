import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: var(--color-lightgrey);
  height: 10vh;
  padding: 5%;
  margin-top: 5%;
  border-top: 1px solid var(--color-yellow);
  display: flex;
  flex-direction: column;
`
export const FooterNav = styled.div`
  width: 100%;
  margin-bottom: 2%;
  align-self: center;
`

export const NavItem = styled.span`
  margin-right: 2%;
  font-size: 1.1em;
  color: var(--color-grey);
  cursor: pointer;
  &:hover {
    color: var(--color-orange);
  }
`
export const FooterInfo = styled.div`
  font-size: 0.9em;
  color: var(--color-grey);
  p {
    padding-top: 5px;
  }
`
