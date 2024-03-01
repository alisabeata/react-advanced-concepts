import React, { useReducer, useContext } from 'react'
import Card from '../Utils/Card/Card'
import classes from './Login.module.css'
import Button from '../Utils/Button/Button'
import { AuthContext } from '../../context/AuthContext'

const initialState = { value: '', isValid: true }

const reducerEmail = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'USER_INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return initialState
}

const reducerPassword = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 3 }
  }
  if (action.type === 'USER_INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 3 }
  }
  return initialState
}

const Login = () => {
  const ctx = useContext(AuthContext)
  const [emailState, dispatchEmail] = useReducer(reducerEmail, initialState)
  const [passwordState, dispatchPassword] = useReducer(
    reducerPassword,
    initialState,
  )
  const { value: emailValue, isValid: emailIsValid } = emailState
  const { value: passwordValue, isValid: passwordIsValid } = passwordState

  const submitHandler = (event) => {
    event.preventDefault()
    ctx.onLogin(emailValue, passwordValue)
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid ? '' : classes.invalid
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailValue}
            onChange={(event) =>
              dispatchEmail({ type: 'USER_INPUT', val: event.target.value })
            }
            onBlur={() => dispatchEmail({ type: 'USER_INPUT_BLUR' })}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid ? '' : classes.invalid
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(event) =>
              dispatchPassword({
                type: 'USER_INPUT',
                val: event.target.value,
              })
            }
            onBlur={() => dispatchPassword({ type: 'USER_INPUT_BLUR' })}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={
              !emailIsValid ||
              emailValue === '' ||
              !passwordIsValid ||
              passwordValue === ''
            }
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
