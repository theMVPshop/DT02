import React, {useContext} from 'react'
import { Link, useHistory } from "react-router-dom"

import Login from "../Login"
import { Logo } from "../../img/Logo"
import DraftrrLogo from "../../img/DraftrrLogo.jsx";

import { Nav } from "react-bootstrap"
import {LoginModal} from '../Login/LoginModal'
import { DraftrrContext } from '../../context/DraftrrContext'

import "./Header.scss"

export const Header = () => {
    const {loginOpen, setLoginOpen, currentUser, logout} = useContext(DraftrrContext)
    const history = useHistory()

    const handleLoginOpen = () => {
        loginOpen ? setLoginOpen(false) : setLoginOpen(true)
    }

    const handleLogout = () => {
        logout()
        history.push('/')
    }

    return (
        <header style={{backgroundColor: "white"}} className="pt-2 d-flex justify-content-between align-items-center">
            <Link className="d-flex align-items-center pl-3 pt-1" to="/">
                <div className="mr-3">
                <Logo width="4em" />
                </div>
                <DraftrrLogo width="7em" />
            </Link>
            <Nav activeKey="/home">
                <Nav.Item className="px-3 mt-3">
                    {/* <Nav.Link href="/home">Active</Nav.Link> */}
                    <Link to="/about">About</Link>
                </Nav.Item>
                <Nav.Item className="px-3 mt-3">
                    {currentUser ?
                    <Link onClick={handleLogout}>Log Out</Link>
                : <Link onClick={handleLoginOpen}>Log In</Link>}
                </Nav.Item>
                <Nav.Item className="px-3 mt-2">
                    <Link className="btn btn-primary rounded-6" to="/dashboard">Get Started</Link>
                </Nav.Item>
            </Nav>
            <LoginModal />
        </header>
    )
}
