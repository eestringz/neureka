import React from 'react'
import { useNavigate } from 'react-router-dom'

import * as f from './styles/FooterStyle'

type Props = {}

const Footer = (props: Props) => {
  const navigate = useNavigate()
  return (
    <>
      <f.Wrapper>
        <f.FooterNav>
          <f.NavItem onClick={() => navigate('/')}>MAIN</f.NavItem>
          <f.NavItem onClick={() => navigate('/news')}>NEWS</f.NavItem>
          <f.NavItem onClick={() => navigate('/stocks')}>STOCK</f.NavItem>
        </f.FooterNav>

        <f.FooterInfo>
          <p>Economic News & Stock HUB</p>
          <p>C105 NEúrēka</p>
        </f.FooterInfo>
      </f.Wrapper>
    </>
  )
}

export default Footer
