import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
        <h1><Link to="/">Sklad<span>io</span></Link></h1>
    </header>
  )
}
