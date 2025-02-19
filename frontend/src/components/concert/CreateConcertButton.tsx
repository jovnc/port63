import React from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function CreateConcertButton() {
  return (
    <Button variant={"outline"} asChild >
      <Link href="/concert/create">
        <Plus size={16} />
        Create Concert
      </Link>
    </Button>
  )
}
