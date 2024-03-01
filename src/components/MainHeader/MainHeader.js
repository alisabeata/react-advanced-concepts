import React from 'react'
import Navigation from './Navigation'
import classes from './MainHeader.module.css'

const MainHeader = ({ onLogout }) => {
  return (
    <header className={classes['main-header']}>
      <h2>Login Page</h2>
      <Navigation onLogout={onLogout} />
    </header>
  )
}

export default MainHeader
