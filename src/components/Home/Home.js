import React, { useContext } from 'react'
import Card from '../Utils/Card/Card'
import classes from './Home.module.css'
import { AuthContext } from '../../context/AuthContext'
import Button from '../Utils/Button/Button'

const Home = () => {
  const ctx = useContext(AuthContext)

  return (
    <Card className={classes.home}>
      <h3>Welcome back!</h3>
      <Button onClick={ctx.onLogout}>Log out</Button>
    </Card>
  )
}

export default Home
