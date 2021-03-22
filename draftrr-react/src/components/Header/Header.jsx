import { Link } from "react-router-dom"

import Login from "../Login"

import "./Header.scss"

export const Header = () => {
    return (
        <header>
            <Link to="/">
                <h1>Draftrr</h1>
            </Link>
            <nav>
                <Link to="/about">About</Link>
                {/* <Link to="/login">Login</Link> */}
                <Login />
                <Link to="/dashboard">Get Started</Link>
            </nav>
        </header>
    )
}
