import { useState, useEffect } from 'react'
import VoiceSelect from '@src/components/TTS/VoiceSelect'
import SpeedSlider from '@src/components/TTS/SpeedSlider'
import VolumeSlider from '@src/components/TTS/VolumeSlider'
import ControlButtons from '@src/components/TTS/ControlButtons'
import * as t from '@src/containers/styles/TextToSpeechContainerStyle'

const TextToSpeechContainer = (props: { articleContent: string }) => {
  const { articleContent } = props

  // HTML 에서 텍스트만 추출
  const ParsingHTML = (htmlString: string): string => {
    // HTML 문자열을 파싱하여 DOM 객체 생성
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, 'text/html')

    let textContent = ''
    // TreeWalker를 사용하여 순수 텍스트 추출
    if (doc.body) {
      const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, {
        acceptNode: node => {
          if (
            node.parentElement &&
            ['script', 'style'].includes(
              node.parentElement.nodeName.toLowerCase(),
            )
          ) {
            return NodeFilter.FILTER_REJECT
          }
          return NodeFilter.FILTER_ACCEPT
        },
      })

      let node: Node | null
      let skipNextText = false // 이미지 태그 다음에 나오는 텍스트를 건너뛰기 위한 플래그
      while ((node = walker.nextNode())) {
        const parentNode = node.parentNode
        if (parentNode && parentNode.nodeName.toLowerCase() === 'img') {
          skipNextText = true // 이미지 태그를 만나면 플래그를 설정하여 다음 텍스트를 건너뜁니다.
          continue
        }
        if (skipNextText) {
          skipNextText = false // 이미지 태그 다음의 텍스트를 건너뛰기 위한 플래그가 설정된 경우, 다음 반복에서 플래그를 해제합니다.
          continue
        }
        textContent += node.nodeValue?.trim() || ''
      }
    }

    // 괄호와 특수 기호 제거
    textContent = textContent.replace(/[\[\]\(\){}<>]/g, '')

    return textContent.trim()
  }

  const text = ParsingHTML(articleContent)

  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null,
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [rate, setRate] = useState(1)
  const [volume, setVolume] = useState(1)

  // 시작
  const handlePlay = () => {
    const synth = window.speechSynthesis

    if (isPaused) {
      synth.resume()
    } else {
      if (!utterance) {
        return
      }

      const textArray = utterance.text.split(/[\n"']+/) // 정규식

      textArray.forEach(text => {
        const newUtterance = new SpeechSynthesisUtterance(text)
        newUtterance.voice = voice
        newUtterance.rate = rate
        newUtterance.volume = volume
        synth.speak(newUtterance)
      })
    }

    setIsPlaying(true)
    setIsPaused(false)
  }

  // 일시정지
  const handlePause = () => {
    const synth = window.speechSynthesis
    synth.pause()
    setIsPlaying(false)
    setIsPaused(true)
  }

  // 멈춤
  const handleStop = () => {
    const synth = window.speechSynthesis
    synth.cancel()
    setIsPlaying(false)
    setIsPaused(false)
  }

  // 목소리 변경 및 언어 변경
  const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const voices = window.speechSynthesis.getVoices()
    setVoice(voices.find(v => v.name === event.target.value) || null)
  }

  // 속도 변경
  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRate(parseFloat(event.target.value))
  }

  // 볼륨 변경
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(event.target.value))
  }

  useEffect(() => {
    const synth = window.speechSynthesis
    const u = new SpeechSynthesisUtterance(text)
    const voices = synth.getVoices()
    setUtterance(u)

    return () => {
      synth.cancel() // 컴포넌트가 unmount 될 때 음성 합성을 중지합니다.
    }
  }, [text])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const synth = window.speechSynthesis
        synth.cancel() // 페이지가 숨겨지면 음성 합성을 중지합니다.
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange) // 이벤트 리스너를 정리합니다.
    }
  }, [])

  return (
    <t.Container>
      <t.Title>음성재생 설정</t.Title>
      {!isPlaying && (
        <t.Setting>
          <VoiceSelect
            voices={window.speechSynthesis.getVoices()}
            selectedVoice={voice?.name}
            onChange={handleVoiceChange}
          />
          <SpeedSlider rate={rate} onChange={handleRateChange} />
          <VolumeSlider volume={volume} onChange={handleVolumeChange} />
        </t.Setting>
      )}
      <ControlButtons
        onPlay={handlePlay}
        onPause={handlePause}
        onStop={handleStop}
        isPlaying={isPlaying}
      />
    </t.Container>
  )
}

export default TextToSpeechContainer
