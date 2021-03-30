import { useState, useContext } from "react"
import { DraftrrContext } from "../../context/DraftrrContext"

import axios from "axios"
import { Link } from "react-router-dom"

import "./Dashboard.scss"

export const Dashboard = () => {
    const [ projects, setProjects ] = useState()
    const [ user, setUser ] = useState()
    const [ textFiles, setTextFiles ] = useState()
    const [ textFilePath, setTextFilePath ] = useState()
    
    const { createProject, createTextFile, currentUser, newProject, setNewProject, } = useContext(DraftrrContext)

    const uid = currentUser.id
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

    // const handleChange = (event) => {
    //     setNewProject(previousValues => ({
    //         ...previousValues, 
    //         [event.target.name]: event.target.value
    //     }))
    //     console.log('new project', newProject)
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     console.log("current user: ", currentUser)
    //     createTextFile(currentUser)
    //     // createProject(newProject)
    // }

    return (
        <div className="container body-container d-flex flex-column align-items-center">
            <h1 className="d-flex justify-content-center my-5 text-primary">Dashboard</h1>
            <div className="d-flex justify-content-center mb-5">
                <button onClick={handleGetUser}>Get User</button>
                <button onClick={handleGetProjects}>Get Projects</button>
                <button onClick={handleGetTextFiles}>Get Text Files</button>            
            </div>
            <Link to="/editor" className="btn btn-primary rounded-6 mb-5">
                New Draft
            </Link>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h2>My Drafts</h2>
                {projects && <ul>{projects.res.data.map((project, idx) => <li key={idx}>{project.Title}</li>)}</ul>}
            </div>
        </div>
    )
}
