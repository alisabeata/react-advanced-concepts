import React, {
  useReducer,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react'
import Card from '../Utils/Card/Card'
import classes from './Login.module.css'
import Button from '../Utils/Button/Button'
import Input from '../Utils/Input/Input'
import { AuthContext } from '../../context/AuthContext'

const initialState = { value: '', isValid: true }

const reducerEmail = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.includes('@'),
    }
  }
  if (action.type === 'USER_INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.includes('@'),
    }
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
  const [formIsValid, setFormIsValid] = useState(false)
  const { value: emailValue, isValid: emailIsValid } = emailState
  const { value: passwordValue, isValid: passwordIsValid } = passwordState
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const submitHandler = (event) => {
    event.preventDefault()

    if (formIsValid) {
      ctx.onLogin(emailValue, passwordValue)
    }

    if (!emailIsValid || emailValue === '') {
      // activateFocus function is inside of the Input Component via useImperativeHandle Hook
      emailInputRef.current.activateFocus()
    }
    
    if (!passwordIsValid || passwordValue === '') {
      passwordInputRef.current.activateFocus()
    }
  }

  useEffect(() => {
    // debounce
    const id = setTimeout(() => {
      console.log('type')
      setFormIsValid(
        emailIsValid &&
          emailValue !== '' &&
          passwordIsValid &&
          passwordValue !== '',
      )
    }, 100)

    return () => {
      console.log('cleanup')
      clearTimeout(id)
    }
  }, [emailIsValid, emailValue, passwordIsValid, passwordValue])

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          isValid={emailIsValid}
          id="email"
          type="email"
          label="E-mail"
          value={emailValue}
          onChange={(event) =>
            dispatchEmail({ type: 'USER_INPUT', val: event.target.value })
          }
          onBlur={() => dispatchEmail({ type: 'USER_INPUT_BLUR' })}
        />
        <Input
          ref={passwordInputRef}
          isValid={passwordIsValid}
          id="password"
          type="password"
          label="Password"
          value={passwordValue}
          onChange={(event) =>
            dispatchPassword({
              type: 'USER_INPUT',
              val: event.target.value,
            })
          }
          onBlur={(event) =>
            dispatchPassword({
              type: 'USER_INPUT',
              val: event.target.value,
            })
          }
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
