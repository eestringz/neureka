import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: var(--color-lightblue);
  &.miniSearchSection {
    height: 50vh;
    div {
      font-size: 0.9rem;
    }
  }
  &.searchSection {
    height: 80vh;
  }
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1200px) {
  }
  @media screen and (max-width: 992px) {
    width: 100%;
    border-bottom-left-radius: 0;
    border-top-right-radius: 30px;
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 576px) {
  }
`

export const Box = styled.div`
  width: 80%;
  height: 100%;
  margin: 20px;
`

export const SearchBar = styled.div`
  width: 100%;
  height: 5%;
  input {
    &:focus {
      outline: none;
      border-bottom: 2px solid var(--color-blue);
    }
    &:hover {
      border-bottom: 2px solid var(--color-blue);
    }
  }
`

export const Words = styled.div`
  margin-top: 20px;
  overflow-y: scroll;
  height: 80%;

  // 스크롤 바 색상
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    height: 20%;
    background: #387bdf61;
  }
  // 스크롤 바 배경 색상
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    border: 1px solid #387bdf61;
    background: var(--color-lightgrey);
  }
  // 스크롤 바 너비
  &::-webkit-scrollbar {
    width: 9px;
  }
`
export const Empty = styled.p`
  color: var(--color-dark);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`

export const Search = styled.img`
  height: 20px;
  margin-right: 10px;
`
