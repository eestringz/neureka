import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

import Modal from 'react-modal'
import CloseIcon from '@mui/icons-material/Close'

export const MyModal = styled(Modal)``
export const Global = createGlobalStyle`
    body {
        .ReactModal__Overlay {
            position: fixed;
            z-index: 900 !important;
            background-color: #4343439d !important;
        }
        .ReactModal__Content {
            position: fixed;
            z-index: 1000;
            height: 450px;
            width: 370px;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);

            background-color: white;
            border-radius: 10px;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
`

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ModalHeader = styled.p`
  font-size: 1.1rem;
`

export const CloseBtn = styled(CloseIcon)`
  position: absolute;
  top: 15px;
  right: 15px;
  color: var(--color-grey);
  cursor: pointer;
`
export const OptionBtn = styled.div`
  padding-top: 5%;
  margin-top: 5%;
  width: 70%;

  border-top: 1px solid black;
  text-align: center;
`

export const ToggleBtn = styled.span`
  font-size: 0.8rem;
  color: var(--color-grey);
  text-align: center;
  cursor: pointer;
`
