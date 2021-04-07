import { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from "react-router-dom"

import { Logo } from "../../img/Logo"
import { DraftrrLogo } from "../../img/DraftrrLogo.jsx";

import { Nav } from "react-bootstrap"
import {LoginModal} from '../Login/LoginModal'
import { DraftrrContext } from '../../context/DraftrrContext'

import "./Header.scss"

export const Header = () => {
    const [signUpBtn, setSignUpBtn] = useState()
    const [loginBtn, setLoginBtn] = useState()
    const {currentPage, setIsLogin, loginOpen, setLoginOpen, currentUser, logout} = useContext(DraftrrContext)
    const history = useHistory()

    const handleLoginOpen = () => {
        // setSignUpBtn(false)
        if (!signUpBtn) {
            setIsLogin(true)
        }
        loginOpen ? setLoginOpen(false) : setLoginOpen(true)
    }



    useEffect(() => {
        if (signUpBtn) {
            setIsLogin(false)
        } 
    }, [signUpBtn])

    useEffect(() => {
        if (loginBtn) {
            setIsLogin(true)
        }
    }, [loginBtn])

    useEffect(() => {
        if (!loginOpen) {
            setSignUpBtn()
            setLoginBtn()
        }
    }, [loginOpen])

    const handleSignupOpen = () => {
        setSignUpBtn(true)
        // setIsLogin(false)
        handleLoginOpen()
    }

    const handleLogout = () => {
        logout()
        history.push('/')
    }

    return (
        <header style={{backgroundColor: "white"}} className="py-2 d-flex justify-content-between align-items-center">
            <Link className="d-flex align-items-center pl-3 pt-1" to="/">
                <div className="mr-3">
                <Logo width="4em" />
                </div>
                <DraftrrLogo width="7em" />
            </Link>
            <Nav activeKey="/home">
                <Nav.Item className="px-3 mt-3">
                    <Link to="/about">About</Link>
                </Nav.Item>
                <Nav.Item className="px-3 mt-3">
                    {currentUser ?
                        <Link to="/" onClick={handleLogout}>Log Out</Link> :
                        <Link to="/" onClick={handleLoginOpen}>Log In</Link>
                    }
                </Nav.Item>
                <Nav.Item className="px-3 mt-2">
                    {currentPage && currentUser ? 
                    <Link className="btn btn-primary rounded-6" to="/dashboard">Usersetting</Link> :
                    currentUser ?
                    <Link className="btn btn-primary rounded-6" to="/dashboard">Dashboard</Link> :
                    <Link to="/" className="btn btn-primary rounded-6" onClick={handleSignupOpen}>Get Started</Link>
                    }
                </Nav.Item>
            </Nav>
            <LoginModal />
        </header>
    )
}
