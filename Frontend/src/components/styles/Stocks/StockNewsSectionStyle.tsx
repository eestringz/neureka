import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  margin-top: 2%;
`

export const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Item = styled.div`
  display: flex;
  padding: 1%;
  transition: all 0.3s ease;
  border-radius: 8px;
  overflow: hidden; /* 이상적인 모양을 유지하기 위해 overflow를 추가 */

  cursor: pointer;

  &:hover {
    background-color: #f9f9f9; /* 호버 시 배경색 변경 */
    /* transform: scale(1.02); */
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

export const ItemBox = styled.div`
  flex: 1;
`

export const ItemInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
`

export const ItemPublisher = styled.div`
  font-size: 0.7rem;
  color: #00aaff;
`

export const ItemDate = styled.div`
  font-size: 0.7rem;
  color: #888;
`

export const ItemTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.3rem;
`

export const ItemContent = styled.div`
  font-size: 0.8rem;
  color: #666;
  line-height: 1.3;
`

export const ItemImage = styled.img`
  width: 100px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-left: 1%;

  @media screen and (max-width: 768px) {
    display: none;
  }
`
