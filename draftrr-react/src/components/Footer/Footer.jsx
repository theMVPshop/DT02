import { FaGithub } from "react-icons/fa"

import "./Footer.scss"

export const Footer = () => {
    return (
        <footer className="flex">
            <div>© {new Date().getFullYear()} Draftrr</div>
            <a href="https://github.com" target="_blank">
                <FaGithub style={{fontSize: "2em"}} />
            </a>
        </footer>
    )
}
