import React from 'react'
import "./Header.css"

export default function Header({
    title,
    testId
}) {
    return <h1 title={title} className="header" data-testid={testId}>{title}</h1>
}
