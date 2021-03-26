import { FaGithub } from "react-icons/fa"

import "./Footer.scss"

export const Footer = () => {
    return (
        <footer className="d-flex justify-content-between align-items-center">
            <div>© {new Date().getFullYear()} Draftrr <i>...spellcheck on the next draft...</i></div>
            <a href="https://github.com/theMVPshop/DT02/tree/main/draftrr-react" target="_blank" className="text-dark">
                <FaGithub style={{fontSize: "2.8em"}} />
            </a>
        </footer>
    )
}
