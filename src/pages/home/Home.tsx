import { Note } from '@types'
import { useEffect, useState } from 'react'

const Home = () => {
  console.log('render home')

  const [notes, setNotes] = useState<Note[]>([])

  return (
    <>
      <aside></aside>
      <article></article>
    </>
  )
}

export default Home
