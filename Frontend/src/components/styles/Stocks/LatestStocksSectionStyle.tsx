import styled from 'styled-components'

export const Container = styled.div`
  /* border-top: 1px solid var(--color-blue); */
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  margin: 3%;
  padding: 3%;

  > * {
    margin-bottom: 5%; /* 각 자식 요소에 마진을 추가하여 간격을 조절합니다 */
  }
`

export const Title = styled.p`
  color: var(--color-dark);
  font-size: 1rem;
  font-weight: 700;
  flex: 0 0 auto; /* 자식 요소가 컨테이너의 크기를 기준으로 크기를 조절하지 않도록 설정 */
`

export const Wrap = styled.div`
  width: 100%;
  flex: 1; /* 나머지 공간을 채우기 위해 Flexbox 속성 사용 */
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`

export const Item = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  font-size: 0.8rem;
  font-weight: 500;

  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`

export const NoneItem = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  color: #000;
`
