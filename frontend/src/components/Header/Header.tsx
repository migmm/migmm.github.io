import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/projects'>Projects</Link></li>
        <li><Link to='/certificates'>Certificates</Link></li>
        <li><Link to='/curriculum'>Curriculum</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header
