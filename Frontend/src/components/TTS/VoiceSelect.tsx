import { ChangeEvent } from 'react'
import Tooltip from '@src/common/Tooltip'
import * as v from '@src/components/styles/TTS/VoiceSelectStyle'

interface VoiceSelectProps {
  voices: SpeechSynthesisVoice[]
  selectedVoice: string | undefined
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const VoiceSelect = ({ voices, selectedVoice, onChange }: VoiceSelectProps) => {
  return (
    <v.Container>
      <Tooltip message={'듣고 싶은 목소리를 선택하세요!'}>
        <v.Title>언어 및 음성 선택</v.Title>
      </Tooltip>
      <v.SelectWrapper>
        <v.CustomSelect value={selectedVoice} onChange={onChange}>
          {voices.map(voice => (
            <v.Option key={voice.name} value={voice.name}>
              {voice.name}
            </v.Option>
          ))}
        </v.CustomSelect>
        <v.ArrowIcon />
      </v.SelectWrapper>
    </v.Container>
  )
}

export default VoiceSelect
