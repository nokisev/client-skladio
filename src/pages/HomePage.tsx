import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="page-container">
      <h1>Welcome to Product Management System</h1>
      <p>
        Go to <Link to="/products">Products</Link> to manage your inventory.
      </p>
    </div>
  )
}
