import { Concert } from '@/types/concert'
import React from 'react'
import { ConcertCard } from './ConcertCard'

export default function ConcertView({concerts}: {concerts: Concert[]}) {
  return (
    <div className='w-full flex flex-col gap-4'>
        {
            concerts.map((concert) => {
                return <ConcertCard concert={concert} key={concert.id} />
            })
        }
    </div>
  )
}
