import React from 'react'

export default function Input(props) {
  return (
    <div className="input-container">
      <input
        {...props}
        className="input"
      />
    </div>
  )
}