import { Link } from "react-router-dom"

import Login from "../Login"
import { Nav } from "react-bootstrap"

import "./Header.scss"

export const Header = () => {
    return (
        <header className="pt-2 d-flex justify-content-end">
            <Link className="container pl-3" to="/">
                <h1>Draftrr</h1>
            </Link>
            <Nav
                className="d-flex justify-content-end"
                activeKey="/home"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
            <Nav.Item className="px-3 mt-2">
                {/* <Nav.Link href="/home">Active</Nav.Link> */}
                <Link to="/about">About</Link>
            </Nav.Item>
            <Nav.Item className="px-3 mt-2">
                <Login />
            </Nav.Item>
            <Nav.Item className="px-3 mt-2">
                <Link to="/dashboard">Get Started</Link>
            </Nav.Item>
            </Nav>
            <nav>
                {/* <Link to="/login">Login</Link> */}
            </nav>
        </header>
    )
}
