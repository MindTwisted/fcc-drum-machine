import React from 'react'
import Bank from '../models/Bank'

type ButtonProps = {
  item: Bank
  setInfo: (value: string) => void
  volume: number
}

const Button: React.FC<ButtonProps> = ({ item, setInfo, volume }: ButtonProps) => {
  const audioEl = React.useRef<HTMLAudioElement | null>(null)
  const buttonEl = React.useRef<HTMLButtonElement | null>(null)
  const handleClick = React.useCallback(() => {
    if (audioEl && audioEl.current) {
      audioEl.current.play()
    }

    setInfo(item.id)
  }, [item, setInfo, audioEl])
  const handleKeyDown = React.useCallback(
    (e) => {
      if (e.keyCode === item.keyCode) {
        handleClick()

        if (buttonEl && buttonEl.current) {
          buttonEl.current.focus()
        }
      }
    },
    [item, handleClick, buttonEl]
  )

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
  React.useEffect(() => {
    if (audioEl && audioEl.current) {
      audioEl.current.volume = volume
    }
  }, [volume, audioEl])

  return (
    <button
      className='Button drum-pad button is-rounded is-large is-primary'
      id={item.keyTrigger}
      ref={buttonEl}
      onClick={handleClick}
    >
      {item.keyTrigger}
      <audio
        className='clip'
        id={item.keyTrigger}
        style={{ display: 'none' }}
        src={item.url}
        ref={audioEl}
      />
    </button>
  )
}

export default Button
