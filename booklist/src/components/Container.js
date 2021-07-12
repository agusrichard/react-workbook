import React from 'react'

export default function Container({ children }) {
  return (
    <div className="container">
      <div className="inner">
        { children }
      </div>
    </div>
  )
}