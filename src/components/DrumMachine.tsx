import React, { ChangeEvent, useState } from 'react'
import './DrumMachine.css'
import Bank from '../models/Bank'
import banks from '../data/banks'
import Volume from './Volume'
import Button from './Button'

type BankName = 'bankOne' | 'bankTwo'

const DrumMachine = () => {
  const [bank, setBank] = useState<{name: BankName, data: Bank[]}>({
    name: 'bankOne',
    data: banks.bankOne
  })
  const [info, setInfo] = useState<string | null>(null)
  const [volume, setVolume] = useState(0.75)
  const bankChangeData: {value: BankName, label: string}[] = [
    {
      value: 'bankOne',
      label: 'Sound set #1'
    },
    {
      value: 'bankTwo',
      label: 'Sound set #2'
    }
  ]
  const handleChangeBank = (e: ChangeEvent<HTMLInputElement>) => {
    setBank({
      name: e.target.value as BankName,
      data: banks[e.target.value as BankName]
    })
    setInfo(null)
  }

  return (
    <div className='box DrumMachine' id='drum-machine'>
      <div className='columns'>
        <div className='column'>
          <div className='DrumMachine__buttons'>
            {bank.data.map((item) => (
              <div className='DrumMachine__button'
                key={item.id}>
                <Button
                  item={item}
                  setInfo={setInfo}
                  volume={volume}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='column'>
          <div
            id='display'
            style={{ minWidth: '10rem' }}
            className='tag is-large'
          >
            {info}
          </div>
          <div className='DrumMachine__volume'>
            <Volume volume={volume} setVolume={setVolume} />
          </div>
          <div className='control'>
            {bankChangeData.map(bankData => (
              <label className='radio'
                key={bankData.value}>
                <input
                  type='radio'
                  checked={bank.name === bankData.value}
                  value={bankData.value}
                  onChange={handleChangeBank}
                /> {bankData.label}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrumMachine
