import { BeatLoader } from 'react-spinners'
import * as l from '@src/common/styles/LoadingStyle'

const Loading = () => {
  return (
    <l.Container
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <BeatLoader
        color="hsla(168, 67%, 53%, 1)"
        loading
        margin={4}
        size={10}
        speedMultiplier={1}
      />
    </l.Container>
  )
}

export default Loading
