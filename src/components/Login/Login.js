import React, { useState, useEffect } from 'react'
import Card from '../Utils/Card/Card'
import classes from './Login.module.css'
import Button from '../Utils/Button/Button'

const Login = ({ onLogin }) => {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const [emailIsValid, setEmailIsValid] = useState()
  const [passwordIsValid, setPasswordIsValid] = useState()

  const submitHandler = (event) => {
    event.preventDefault()
    onLogin(enteredEmail, enteredPassword)
  }

  useEffect(() => {
    // debounce
    const id = setTimeout(() => {
      console.log('type')
      setEmailIsValid(enteredEmail.includes('@'))
      setPasswordIsValid(enteredPassword.trim().length > 3)
    }, 500)

    return () => {
      console.log('cleanup')
      clearTimeout(id)
    }
  }, [setEmailIsValid, setPasswordIsValid, enteredEmail, enteredPassword])

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control}`}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={(event) => setEnteredEmail(event.target.value)}
          />
        </div>
        <div className={`${classes.control}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={(event) => setEnteredPassword(event.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!emailIsValid || !passwordIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
