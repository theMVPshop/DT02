import {useState} from 'react'
import "./Dashboard.scss"
import axios from 'axios'

export const Dashboard = () => {
    const [projects, setProjects] = useState()
    const [user, setUser] = useState()
    const [textFiles, setTextFiles] = useState()
    const [textFilePath, setTextFilePath] = useState()

    const uid = "poopoo"
    const id = 4
    const email = "d.schombergii@gmail.com"

    const handleGetUser = () => {

        axios.get(`http://localhost:4000/users/email/${email}`).then( res => setUser({data : res}))

          
        console.log(user)

    }

    const handleGetProjects = () => {

        axios.get(`http://localhost:4000/user/projects/${uid}`).then( res => setProjects({res}))

          
        console.log(projects)

    }

    const handleGetTextFiles = () => {

        axios.get(`http://localhost:4000/text/${textFilePath}`).then( res => setTextFiles({res}))

          
        console.log(textFiles)

    }


    return (
        <div className="body-container">
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>Dashboard</div>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '50px'}}>
                <button onClick={handleGetUser}>GET USER</button>
                <button onClick={handleGetProjects}>GET PROJECTS</button>
                <button onClick={handleGetTextFiles}>GET TEXT FILES</button>

            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <h1>Projects</h1>
                {projects && <ul>{projects.res.data.map((project, idx) => <li key={idx}>{project.Title}</li>)}</ul>}
            </div>
            
        </div>
    )
}
