import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: white;
  width: 80%;
  padding: 1% 3%;
  margin: 20px 0;
  border-radius: 10px;

  display: flex;
  justify-content: space-between;

  border: 1.5px solid transparent;
  &:hover {
    /* border: 1.5px solid var(--color-orange); */
  }
  label {
    margin: 0 1px;
  }

  @media screen and (max-width: 1200px) {
  }
  @media screen and (max-width: 992px) {
  }
  @media screen and (max-width: 768px) {
    &.article-grade {
      flex-direction: column;
      align-items: center;
    }
  }
  @media screen and (max-width: 576px) {
  }
`
export const GradeMsg = styled.span`
  /* align-self: center; */
  /* font-weight: 700; */
`
