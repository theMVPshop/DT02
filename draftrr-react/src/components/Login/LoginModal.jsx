import React, {useContext} from 'react'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import { DraftrrContext } from '../../context/DraftrrContext'
import {Login} from './Login'
import {SignUp} from './SignUp'
import {ForgotPassword} from './ForgotPassword'

export const LoginModal = () => {
    const {loginOpen, setLoginOpen, isLogin, setIsLogin, isForgotPassword, setIsForgotPassword} = useContext(DraftrrContext)

    const handleClose = () => {
        loginOpen && setLoginOpen(false)
    }

    const handleIsLogin = () => {
        isLogin ? setIsLogin(false) : setIsLogin(true)
    }

    const handleForgotPassword = () => {
        setIsForgotPassword(false)
    }

  return (
    <Modal show={loginOpen}>
      <Modal.Header>
      {isForgotPassword 
      ? <h3>Forgot Password</h3>
      : isLogin
      ? <h3>Log In</h3>
      : <h3>Sign Up</h3>}
        <button type="button" className="close" aria-label="Close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
        </button>
      </Modal.Header>
        <Modal.Body>
          {isForgotPassword
          ? <ForgotPassword />
          : isLogin 
            ? <Login />
            : <SignUp /> }
        </Modal.Body>
      {isForgotPassword
      ? <Modal.Footer>Go back to <a onClick={handleForgotPassword} href="#">Log In</a></Modal.Footer>
      : isLogin 
      ?
        <Modal.Footer>Need an account? <a onClick={handleIsLogin} href="#">Sign Up</a></Modal.Footer>
      :
        <Modal.Footer>Already have an account? <a onClick={handleIsLogin} href="#">Log In</a></Modal.Footer>
      }
    </Modal>
  )
}