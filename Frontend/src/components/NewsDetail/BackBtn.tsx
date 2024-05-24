import React from 'react'

import * as b from '@src/components/styles/NewsDetail/BackBtnStyle'
import { useNavigate } from 'react-router-dom'

type Props = {}

const BackBtn = (props: Props) => {
  const navigate = useNavigate()
  return <b.BackBtn onClick={() => navigate(-1)}>BACK</b.BackBtn>
}

export default BackBtn
