import React, { useReducer } from 'react'
import Card from '../Utils/Card/Card'
import classes from './Login.module.css'
import Button from '../Utils/Button/Button'

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
  if (action.type === 'PASSWORD_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 3 }
  }
  if (action.type === 'PASSWORD_INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 3 }
  }
  return initialState
}

const Login = ({ onLogin }) => {
  const [emailState, dispatchEmail] = useReducer(reducerEmail, initialState)
  const [passwordState, dispatchPassword] = useReducer(
    reducerPassword,
    initialState,
  )

  const submitHandler = (event) => {
    event.preventDefault()
    onLogin(emailState.value, passwordState.value)
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid ? '' : classes.invalid
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={(event) =>
              dispatchEmail({ type: 'USER_INPUT', val: event.target.value })
            }
            onBlur={() => dispatchEmail({ type: 'USER_INPUT_BLUR' })}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid ? '' : classes.invalid
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(event) =>
              dispatchPassword({
                type: 'PASSWORD_INPUT',
                val: event.target.value,
              })
            }
            onBlur={() => dispatchPassword({ type: 'PASSWORD_INPUT_BLUR' })}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={
              !emailState.isValid ||
              emailState.value === '' ||
              !passwordState.isValid ||
              passwordState.value === ''
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
