import React from 'react'
import ReactDOM from 'react-dom'
import Card from './Card'
import Button from './Button'
import classes from './ErrorModal.module.css'

const Modal = ({ onConfirm, title, message }) => (
  <div>
    <div className={classes.backdrop} onClick={onConfirm} />
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{title}</h2>
      </header>
      <div className={classes.content}>
        <p>{message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={onConfirm}>Okay</Button>
      </footer>
    </Card>
  </div>
)

const ErrorModal = ({ onConfirm, title, message }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Modal onConfirm={onConfirm} title={title} message={message} />,
        document.getElementById('modal-root'),
      )}
    </>
  )
}

export default ErrorModal
