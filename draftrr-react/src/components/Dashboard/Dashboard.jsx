import { useState, useContext, useEffect } from "react"
import { DraftrrContext } from '../../context/DraftrrContext'

import axios from "axios"
import { Link } from "react-router-dom"

import "./Dashboard.scss"

export const Dashboard = () => {
    const [ textFiles, setTextFiles ] = useState()
    const [ textFilePath, setTextFilePath ] = useState()
    
    const {currentUser, loading, setLoading, projects, setProjects, currentProject, setCurrentProject, deleteProject} = useContext(DraftrrContext)

    useEffect(() => {
        handleGetProjects()
    }, [])

    const uid = currentUser.uid
    const name = currentUser.displayName

    const handleGetProjects = () => {
        axios.get(`http://localhost:4000/user/projects/${uid}`).then( res => {
            setProjects(res.data)
            console.log('res', res.data)
        })
        console.log('projects', projects)
    }

    const handleGetTextFiles = () => {
        axios.get(`http://localhost:4000/text/${textFilePath}`).then( res => setTextFiles({res}))
        console.log(textFiles)
    }

    const handleSelect = (payload) => {
        setCurrentProject(payload)
    }

    const handleNewClick = () => {
        setCurrentProject()
    }
    
    const handleDelete = (project, idx) => {
        deleteProject(project.idProjects, project.Text_ID, idx)
    }

    useEffect(() => {
        console.log('projects', projects)
    }, [projects])


    return (
        <div className="container body-container d-flex flex-column align-items-center">
            <h1 className="d-flex justify-content-center my-5 text-primary">Dashboard</h1>
            <h3>{`Hello, ${name}`}</h3>
            <Link to="/editor" className="btn btn-primary rounded-6 mb-5" onClick={handleNewClick}>
                New Draft
            </Link>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h2>My Drafts</h2>
                {projects && <ul>{projects.map((project, idx) => <li key={idx} id={project.idProjects} style={{display: 'flex', width: '300px', justifyContent: 'space-between'}}>{project.Title}
                                                                    <Link to='editor' className="btn btn-info rounded-6 mb-5" onClick={()=> handleSelect(project)}>Go to Project</Link>
                                                                    <button  className="btn btn-danger rounded-6 mb-5" onClick={()=> handleDelete(project, idx)}>Delete Project</button>
                                                                 </li>)}
                            </ul>}
            </div>
        </div>
    )
}
