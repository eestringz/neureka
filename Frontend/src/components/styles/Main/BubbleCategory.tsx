import { CategoryBoxProps } from '@src/types/MainType'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
`

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  height: 35px;
`

export const CategoryInfo1 = styled.button`
  background-color: var(--color-yellow);
  box-shadow: var(--shadow-inner);
  color: white;
  width: 40%;
  /* height: 40px; */
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
`
export const CategoryInfo2 = styled.div`
  color: black;
  width: 60%;
  /* height: 40px; */
  font-size: 20px;
  border: none;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`

export const CategoryWrapper = styled.div`
  margin-bottom: -3px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 150px;
  transition: all 0.3s;
  gap: 10px;
  justify-content: center;
  align-items: center;
  border-top: 2px solid var(--color-dark);
  /* border-bottom: 1px solid var(--color-dark); */
`

export const Category = styled.button`
  width: 18%;
  height: 50px;
  transition: opacity 0.3s ease;
`
