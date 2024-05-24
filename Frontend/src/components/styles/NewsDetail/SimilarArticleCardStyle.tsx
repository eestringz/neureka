import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: var(--color-lightblue);
  width: 32%;
  height: 250px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow);
  cursor: pointer;
  transform: translateY(0);
  transition: transform 300ms ease-in-out;
  &:hover {
    transform: translateY(-3px);
  }
  &:hover .card-thumbnail {
    opacity: 0.8;
  }
`
export const Thumbnail = styled.img`
  width: 100%;
  height: 70%;
  object-fit: cover;
  opacity: 1;
  transition: all 200ms ease-in-out;
`

export const TitleBox = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
`

export const Title = styled.p`
  padding: 0 10px;
  margin: 10px 0;
  font-size: 1.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  align-self: center;
`
