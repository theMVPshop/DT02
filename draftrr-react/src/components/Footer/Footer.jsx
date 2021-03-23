import { FaGithub } from "react-icons/fa"

import "./Footer.scss"

export const Footer = () => {
    return (
        <footer className="flex">
            <div>© {new Date().getFullYear()} Draftrr</div>
            <FaGithub style={{fontSize: "2em"}} />
        </footer>
    )
}
