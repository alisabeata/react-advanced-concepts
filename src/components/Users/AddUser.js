import React, { useState, useRef } from 'react'

import Card from '../Utils/Card'
import Button from '../Utils/Button'
import ErrorModal from '../Utils/ErrorModal'
import classes from './AddUser.module.css'

const AddUser = ({ onAddUser }) => {
  const nameInputRef = useRef()
  const ageInputRef = useRef()
  const [error, setError] = useState()

  const addUserHandler = (event) => {
    event.preventDefault()

    const enteredUsername = nameInputRef.current.value
    const enteredAge = ageInputRef.current.value

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      })
      return
    }

    if (Number(enteredAge) < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      })
      return
    }

    onAddUser(enteredUsername, enteredAge)

    nameInputRef.current.value = ''
    ageInputRef.current.value = ''
  }

  const errorHandler = () => {
    setError(null)
  }

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  )
}

export default AddUser
