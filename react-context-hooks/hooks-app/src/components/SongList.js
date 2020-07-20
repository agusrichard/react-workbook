import React, { useState, useEffect } from 'react'
import { v1 } from 'uuid'
import NewSongForm from './NewSongForm'

export default function SongList() {
  const [ songs, setSongs ] = useState([
    {id: 1, title: 'Let it be'},
    {id: 2, title: 'Hey Jude'},
    {id: 3, title: 'Yesterday'}
  ])
  const [ number, setNumber ] = useState(0)

  const addSong = (title) => {
    setSongs([...songs, { id: v1(), title }])
  }

  useEffect(() => {
    console.log('songs', songs)
  }, [songs])

  useEffect(() => {
    console.log('number', number)
  }, [number])

  return (
    <div className="song-list">
      <ul>
        { songs.map(song => <li key={ song.id } >{ song.title }</li>) }
      </ul>
      <NewSongForm addSong={ addSong } />
      <button onClick={ () => setNumber(number + 1) } >Number {number}</button>
    </div>
  )
}