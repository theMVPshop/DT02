import React, {useContext} from 'react'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import { DraftrrContext } from '../../context/DraftrrContext'
import {Login} from './Login'
import {SignUp} from './SignUp'

export const LoginModal = () => {
    const {loginOpen, setLoginOpen, isLogin, setIsLogin} = useContext(DraftrrContext)

    const handleClose = () => {
        loginOpen && setLoginOpen(false)
    }

    const handleIsLogin = () => {
        isLogin ? setIsLogin(false) : setIsLogin(true)
    }

  return (
    <Modal show={loginOpen}>
      <Modal.Header>
        <button type="button" class="close" aria-label="Close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
        </button>
      </Modal.Header>
        <Modal.Body>
          {isLogin 
            ? <Login />
            : <SignUp /> }
        </Modal.Body>
      {isLogin 
      ?
        <Modal.Footer>Need an account? <a onClick={handleIsLogin} href="#">Sign Up</a></Modal.Footer>
      :
        <Modal.Footer>Already have an account? <a onClick={handleIsLogin} href="#">Log In</a></Modal.Footer>
      }
    </Modal>
  )
}