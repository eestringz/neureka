import styled from 'styled-components'

export const Wrapper = styled.div`
  margin: 0 10%;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`
export const Header = styled.div<{ bgimage: string }>`
  width: 100%;
  /* height: 150vh; */
  display: flex;
  flex-direction: column;
  background-image: url(${props => props.bgimage});
  position: relative;
  padding-bottom: 100px;
  /* padding: 20px; */
  &::before {
    background: linear-gradient(
        -45deg,
        white 16px,
        red 16px,
        blue 16px,
        transparent 0
      ),
      linear-gradient(45deg, white 16px, transparent 0);
    background-position: left top;
    background-repeat: repeat-x;
    background-size: 15px 32px;
    content: ' ';
    display: block;

    height: 32px;
    width: 100%;

    position: absolute;
    bottom: 0;
    left: 0;
  }
  @media screen and (max-width: 1200px) {
    &.header {
    }
    .left {
      width: 100%;
    }
    .right {
      width: 100%;
    }
  }
  @media screen and (max-width: 992px) {
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 576px) {
  }
`
export const LeftSide = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 20px;
  /* border-bottom: 1px dashed grey; */
`
export const SideHeader = styled.p`
  width: 100%;
  margin-top: 40px;
  /* margin-bottom: 2%; */
  padding-bottom: 10px;

  font-size: 1.7rem;
  border-bottom: 1px solid var(--color-grey);
  span {
    margin-left: 30px;
  }
`
export const RightSide = styled.div`
  width: 100%;
  height: 50%;
`
