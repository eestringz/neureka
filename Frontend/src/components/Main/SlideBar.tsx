import React from 'react'
import * as s from '../styles/Main/SlideBarStyle'

const SlideBar = () => {
  return (
    <s.SlideWrapper>
      <s.SlideBox>
        <s.SlideOriginal>
          <s.SlideText>TODAY'S NEúrēka</s.SlideText>
          <s.SlideText>ECONOMIC NEWS RECOMMENDATION</s.SlideText>
          <s.SlideText>CUSTOMIZED NEWS HUB</s.SlideText>
          <s.SlideText>NEWS & STOCK</s.SlideText>
        </s.SlideOriginal>
        <s.SlideClone>
          <s.SlideText>TODAY'S NEúrēka</s.SlideText>
          <s.SlideText>ECONOMIC NEWS RECOMMENDATION</s.SlideText>
          <s.SlideText>CUSTOMIZED NEWS HUB</s.SlideText>
          <s.SlideText>NEWS & STOCK</s.SlideText>
        </s.SlideClone>
      </s.SlideBox>
    </s.SlideWrapper>
  )
}

export default SlideBar
