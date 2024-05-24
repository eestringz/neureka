import { useRef } from 'react'

const useMoveScroll = () => {
  const element = useRef<HTMLDivElement>(null)

  const onMoveToElement = () => {
    if (element.current) {
      const elementRect = element.current.getBoundingClientRect()
      const absoluteElementTop = elementRect.top + window.pageYOffset
      const scrollTop = absoluteElementTop
      window.scrollTo({ top: scrollTop, behavior: 'smooth' })
    }
  }

  return { element, onMoveToElement }
}

export default useMoveScroll
