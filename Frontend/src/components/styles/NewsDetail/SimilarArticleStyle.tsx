import styled from 'styled-components'

export const Wrapper = styled.div`
  /* background-color: white; */
  border-top: 1px solid var(--color-dark);
  width: 80%;
  padding: 3%;
  margin-top: 5%;
  @media screen and (max-width: 1200px) {
    .title {
      font-size: 1.4rem;
    }
    .card-box {
      height: auto;
    }
    .card-title {
      font-size: 1.1rem;
    }
  }
  @media screen and (max-width: 992px) {
    .title {
      font-size: 1.3rem;
    }
    .card-box {
      /* height: 220px; */
    }
    .card-title {
      font-size: 1rem;
    }
  }
  @media screen and (max-width: 768px) {
    .card-box {
      /* height: 170px; */
    }
  }
  @media screen and (max-width: 576px) {
    .title {
      font-size: 1.1rem;
    }
    .card-box {
      height: auto;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .card {
      width: 90%;
      margin-bottom: 20px;
    }
  }
`

export const Title = styled.p`
  color: var(--color-navy);
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 20px;
`
export const ArticleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
