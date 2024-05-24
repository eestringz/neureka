import StopIcon from '@mui/icons-material/Stop'
import PauseIcon from '@mui/icons-material/Pause'
import Tooltip from '@src/common/Tooltip'
import * as c from '@src/components/styles/TTS/ControlButtonsStyle'

interface ControlButtonsProps {
  onPlay: () => void
  onPause: () => void
  onStop: () => void
  isPlaying: boolean
}

const ControlButtons = ({
  onPlay,
  onPause,
  onStop,
  isPlaying,
}: ControlButtonsProps) => {
  return (
    <c.Container>
      {isPlaying ? (
        <c.ButtonWrap>
          <c.PauseButton onClick={onPause}>
            <PauseIcon />
          </c.PauseButton>
          <c.StopButton onClick={onStop}>
            <StopIcon />
          </c.StopButton>
        </c.ButtonWrap>
      ) : (
        <c.PlayButton onClick={onPlay}>본문듣기 시작</c.PlayButton>
      )}
    </c.Container>
  )
}

export default ControlButtons
