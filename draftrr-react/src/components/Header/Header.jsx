import { Link } from "react-router-dom"

import Login from "../Login"

import "./Header.scss"

export const Header = () => {
    return (
        <header>
            <h1>Draftrr</h1>
            <nav>
                <Link to="/about">About</Link>
                {/* <Link to="/login">Login</Link> */}
                <Login />
                <Link to="/dashboard">Get Started</Link>
            </nav>
        </header>
    )
}
