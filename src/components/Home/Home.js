import React from 'react'

import Card from '../Utils/Card/Card'
import classes from './Home.module.css'

const Home = (props) => {
  return (
    <Card className={classes.home}>
      <h3>Welcome back!</h3>
    </Card>
  )
}

export default Home
