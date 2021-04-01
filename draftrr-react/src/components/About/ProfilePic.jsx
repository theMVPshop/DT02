import { Avatar } from '../../img/Avatar'


export const ProfilePic = ({name, role, avatar, github, linkedin}) => {
    return (
        <div className="d-flex flex-column align-items-center pt-5 px-3">
            <h3>{name}</h3>
            <h5>{role}</h5>
            <Avatar devName={avatar} width='200' className="circle" />
            <a className="about-link" href={`https://github.com/${github}`} target="_blank" rel="noreferrer">GitHub</a>
            <a className="about-link" href={`https://linkedin.com/${linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
    )
}
