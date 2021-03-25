import { FaGithub } from "react-icons/fa"

import "./Footer.scss"

export const Footer = () => {
    return (
        <footer className="d-flex justify-content-between align-items-center">
            <div>© {new Date().getFullYear()} Draftrr</div>
            <a href="https://github.com" target="_blank" className="text-dark">
                <FaGithub style={{fontSize: "2.8em"}} />
            </a>
        </footer>
    )
}
