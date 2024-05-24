import styled from 'styled-components'

export const categoryWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100px;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease; // 변환(확대) 애니메이션

  &:hover {
    transform: scale(1.1); // 마우스 호버 시 아이콘 확대
    cursor: pointer;
  }
  cursor: pointer;
`

export const Icon = styled.img`
  width: 75px;
  height: 75px;
  cursor: pointer;
`

export const Category = styled.div`
  width: 100px;
  height: 30px;
  text-align: center;
  font-size: 1.1rem;
`
