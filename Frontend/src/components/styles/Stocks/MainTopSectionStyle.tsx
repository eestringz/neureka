import styled from 'styled-components'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded'
import NotificationAddIcon from '@mui/icons-material/NotificationAdd'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: var(--color-lightgrey);
  padding: 2% 0;
  border-bottom: 2px solid var(--color-dark);
  top: 13vh;
  /* position: sticky; */
`

export const Title = styled.p`
  color: var(--color-dark);
  font-size: 2rem;
  font-weight: 600;
`

export const CodeNumber = styled.span`
  color: var(--color-grey);
  font-size: 1rem;
  margin-left: 10px;
  align-self: flex-end;
`

export const ButtonWrap = styled.div`
  margin-left: auto;
  margin-right: 1%;
  align-self: flex-end;
  width: 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const AddButton = styled(AddCircleIcon)`
  color: #ffc700;
  font-size: 1.5rem !important;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`

export const RemoveButton = styled(RemoveCircleIcon)`
  color: red;
  font-size: 1.5rem !important;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`

export const SubscribeButton = styled(NotificationAddIcon)`
  color: darkgray;
  font-size: 1.5rem !important;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`

export const SubscribingButton = styled(NotificationsActiveRoundedIcon)`
  color: #ffc700;
  font-size: 1.5rem !important;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`
