import React from 'react'

export default function BookItem({ book }) {
  const months = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let date = new Date(book.start)
  date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()

  return (
    <div className="book-item">
      <h3 style={{ textAlign: 'center', fontWeight: 'bolder' }}>{ book.title }</h3>
      <p style={{ fontWeight: 700 }}>Author  : { book.author }</p>
      <p style={{ fontWeight: 700 }}>Start   : { date }</p>
    </div>
  )
}