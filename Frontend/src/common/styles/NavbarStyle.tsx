import styled from 'styled-components'

export const Wrapper = styled.div`
  margin: 0;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 13vh;
  overflow: hidden;

  @media screen and (max-width: 992px) {
    .nav-selector {
      p {
        font-size: 1.4rem;
      }
    }
    .navbar-container {
      width: 40%;
    }
  }
  @media screen and (max-width: 768px) {
    .nav {
      .button-section {
        flex-direction: column;
        button {
          width: 80px;
          height: 4vh;
          font-size: 100%;
        }
        .login-btn {
          margin-bottom: 10px;
        }
      }
    }
    .nav-selector {
      p {
        font-size: 1.3rem;
      }
    }
    .navbar-container {
      width: 45%;
    }
  }
  @media screen and (max-width: 576px) {
    .navbar-container {
      width: 50%;
    }
  }
`

export const Nav = styled.div`
  /* font-family: 'Giants-Inline'; */
  /* font-family: 'Giants-Regular'; */
  /* font-family: 'SEBANG_Gothic_Regular'; */

  height: 13vh;
  transition: all 300ms ease-in-out;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  position: sticky;
  z-index: 1000;
  background-color: var(--color-lightgrey);
  opacity: 1;
  &::before {
    background-color: var(--color-lightgrey);
    opacity: 0.8;
    width: 100%;
    height: 100%;
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  &.changed {
    background-color: transparent;
  }
`
export const NavTitle = styled.span`
  cursor: pointer;
  font-size: 1.8rem;
  z-index: 1001;
  margin-left: 20px;
  span {
    color: var(--color-navy);
    font-size: 2rem;
    font-weight: 500;
    margin-right: 1px;
  }
`
export const NavButton = styled.div`
  position: absolute;
  z-index: 999;
  right: 20px;
  display: flex;
  justify-content: space-between;
  button {
    color: var(--color-dark);
    background-color: transparent;
    font-family: 'IBM Plex Sans Condensed', sans-serif;
    font-weight: 300;
    cursor: pointer;
    font-size: 1.5rem;
    text-align: center;
    align-items: center;
    border: none;
    /* border-radius: 10px; */
    width: 90px;
    height: 6vh;
  }
`
export const LoginBtn = styled.button`
  margin-right: 7%;
  /* background-color: var(--color-orange); */
  &:hover {
    color: var(--color-blue);
  }
`

export const MenuBtn = styled.button`
  /* background-color: var(--color-navy); */
  &:hover {
    color: var(--color-orange);
  }
`

export const MenuBox = styled.div`
  width: 40%;
  height: 100vh;
  background-color: #ecececdb;
  position: fixed;
  z-index: 800;
  right: 0;
  transition: all 0.5s ease;
  &.nav-open {
    transform: translateY(0);
  }
  &.nav-close {
    transform: translateY(-100%);
    opacity: 0;
  }
`
export const MenuList = styled.div`
  color: var(--color-navy);
`
export const MenuSelect = styled.p`
  cursor: pointer;
  margin: 10% 5%;
  padding-left: 3%;
  font-size: 1.5rem;
  font-weight: 200;

  &:hover {
    color: white;
    background-color: #ff7530;
  }
`

export const LoginBox = styled.div`
  width: 300px;
  height: auto;
  background-color: #ecececdb;
  position: fixed;
  z-index: 800;
  right: 0;
  transition: transform 0.5s ease;
  &.login-open {
    transform: translateY(0);
  }
  &.login-close {
    transform: translateY(-100%);
    opacity: 0;
  }
`

export const Logincontent = styled.div`
  width: 70%;
  margin-top: 5%;
`

export const LoginSelect = styled.p`
  width: 90%;
  height: 30px;
  background-color: white;
  color: var(--color-dark);
  display: flex;
  align-items: center;
  margin: 2%;
  padding: 2%;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: var(--color-lightblue);
  }
`

export const LoginIcon = styled.img`
  height: 100%;
  margin-right: 3%;
`
