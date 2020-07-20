import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'


export default function ToggleTheme() {
  const { toggleTheme } = useContext(ThemeContext)
  return (
    <button onClick={toggleTheme}>Toggle Theme</button>
  )
}