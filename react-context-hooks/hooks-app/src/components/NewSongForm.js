import React, { useState } from 'react'

export default function NewSongForm({ addSong }) {
  const [ title, setTitle ] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    addSong(title)
    setTitle('')
  }

  return (
    <form onSubmit={ handleSubmit }>
      <label>Add song</label>
      <input type="text" value={ title } placeholder="What song?" onChange={ event => setTitle(event.target.value) }/>
      <input type="submit" value="Add song" />
    </form>
  )
}