import { FaGithub } from "react-icons/fa"
import { WoodPeckerTop } from '../../img/WoodPeckerTop'

import "./Footer.scss"

export const Footer = () => {
    return (
        <footer className="d-flex justify-content-between align-items-center">
            {/* <div className="woodpeckerOnFooter">
                        <WoodPeckerTop width="200px" />
             </div> */}
            <div>© {new Date().getFullYear()} Draftrr <i style={{color: "#BABABA"}}>spellcheck on the next draft...</i></div>
            <a href="https://github.com/theMVPshop/DT02/tree/main/draftrr-react" className="text-dark" target="_blank" rel="noreferrer">
                <FaGithub style={{fontSize: "2.8em"}} />
            </a>
        </footer>
    )
}
