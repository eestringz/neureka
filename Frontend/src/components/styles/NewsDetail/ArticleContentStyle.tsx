import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: #ffffff9e;
  border-radius: 10px;
  padding: 3%;
  margin-top: 30px;
  width: 80%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1200px) {
    .article-title {
      font-size: 1.5rem;
    }
    .article-date {
      font-size: 0.9rem;
    }
  }
  @media screen and (max-width: 992px) {
    .article-content {
      line-height: 2;
      font-size: 1rem;
    }
  }
  @media screen and (max-width: 768px) {
    .article-title {
      font-size: 1.3rem;
    }
    .article-date {
      font-size: 0.8rem;
    }
  }
  @media screen and (max-width: 576px) {
    .article-thumbnail {
      display: none;
    }
  }
`
export const Title = styled.div`
  width: 100%;
  font-size: 1.7rem;
  font-weight: 700;
  margin-bottom: 10px;
`

export const Info = styled.p`
  display: flex;
  /* justify-content: space-between; */
`
export const Press = styled.span`
  color: var(--color-blue);
  font-weight: 700;
  margin-right: 10px;
`
export const Date = styled.span`
  color: var(--color-grey);
`

export const Image = styled.img`
  width: 70%;
  aspect-ratio: 2;
  align-self: center;
  margin: 30px 0;
  object-fit: cover;
`
export const Content = styled.article`
  margin: 3% 0;
  padding: 0 30px;
  /* background-color: orange; */
  line-height: 2.2;
  font-size: 1.1rem;
  white-space: pre-wrap;
  > div {
    display: flex;
    flex-direction: column;
  }
  img {
    width: 70%;
    align-self: center;
  }
`
