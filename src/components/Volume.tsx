import React, { ChangeEvent } from 'react'
import './Volume.css'

type VolumeProps = {
  volume: number
  setVolume: (value: number) => void
}

const Volume: React.FC<VolumeProps> = ({ volume, setVolume }: VolumeProps) => {
  return (
    <div className='Volume control'>
      <label>
        <input
          type='range'
          min='0'
          max='1'
          value={volume}
          step='0.05'
          onChange={(e: ChangeEvent<HTMLInputElement>) => setVolume(Number(e.target.value))}
        /> Volume: {volume}
      </label>
    </div>
  )
}

export default Volume
