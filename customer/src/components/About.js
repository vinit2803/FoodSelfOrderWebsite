import React from 'react'
import { Link } from 'react-router-dom'


const About = () => {
  return (
    <div>
      This is about page
      <Link to="/orderhistory">Order history</Link>
    </div>
  )
}

export default About
