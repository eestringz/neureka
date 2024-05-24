import { ChangeEvent } from 'react'
import Tooltip from '@src/common/Tooltip'
import * as v from '@src/components/styles/TTS/VolumeSliderStyle'

interface VolumeSliderProps {
  volume: number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const VolumeSlider = ({ volume, onChange }: VolumeSliderProps) => {
  return (
    <v.Container>
      <Tooltip message={'볼륨을 조절해보세요!'}>
        <v.Title>음량 조절</v.Title>
      </Tooltip>
      <input
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={volume}
        onChange={onChange}
      />
    </v.Container>
  )
}

export default VolumeSlider
