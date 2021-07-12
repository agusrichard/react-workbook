import React from 'react'
import ClipLoader from "react-spinners/ClipLoader"

export default function Button({ style, loading, title }) {
  return (
    <button className="button" style={style}>
      { !loading ? title :
        <ClipLoader loading={ loading } color="#fff" size={18} />
      }
    </button>
  )
}