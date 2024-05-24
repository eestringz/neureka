import { ChangeEvent } from 'react'
import Tooltip from '@src/common/Tooltip'
import * as s from '@src/components/styles/TTS/SpeedSliderStyle'

interface SpeedSliderProps {
  rate: number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const SpeedSlider = ({ rate, onChange }: SpeedSliderProps) => {
  return (
    <s.Container>
      <Tooltip message={'속도를 조절해보세요!'}>
        <s.Title>말하기 속도 조절</s.Title>
      </Tooltip>
      <input
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={rate}
        onChange={onChange}
      />
    </s.Container>
  )
}

export default SpeedSlider
