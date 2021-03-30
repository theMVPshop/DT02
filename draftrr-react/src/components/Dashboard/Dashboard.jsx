import {useState, useContext} from "react"
import {DraftrrContext} from "../../context/DraftrrContext"

import axios from "axios"
import { Link } from "react-router-dom"

import "./Dashboard.scss"

export const Dashboard = () => {
    const [projects, setProjects] = useState()
    const [user, setUser] = useState()
    const [textFiles, setTextFiles] = useState()
    const [textFilePath, setTextFilePath] = useState()
    
    const {createProject, createTextFile, currentUser, newProject, setNewProject} = useContext(DraftrrContext)

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

    const handleChange = (event) => {
        setNewProject(previousValues => ({
            ...previousValues, 
            [event.target.name]: event.target.value
        }))
        console.log('new project', newProject)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("current user: ", currentUser)
        createTextFile(currentUser)
        // createProject(newProject)
    }

    return (
        <div className="container body-container d-flex flex-column align-items-center">
            <h1 className="d-flex justify-content-center my-5 text-primary">Dashboard</h1>
            <div className="d-flex justify-content-center mb-5">
                <button onClick={handleGetUser}>Get User</button>
                <button onClick={handleGetProjects}>Get Projects</button>
                <button onClick={handleGetTextFiles}>Get Text Files</button>            
            </div>
            <Link to="/editor"><button className="btn btn-primary rounded-6">New Draft</button></Link>
            <div>
                <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center">
                    <h2 className="text-center my-4">Form</h2>
                    <label htmlFor="title">Title:</label>
                    <input onChange={handleChange} type="text" name="title"/>
                    <label htmlFor="timeFrame">Time Editable:</label>
                    <input onChange={handleChange} type="number" name="timeFrame"/>
                    <label htmlFor="maxCharacters">Max Visible Characters:</label>
                    <input onChange={handleChange} type="number" name="maxCharacters"/>
                    {/* <label  htmlFor="font">Font:</label>
                    <input onChange={handleChange} type="text" name="font"/> */}
                    <h3 className="text-center mt-3">Trustee</h3>
                    <label htmlFor="trusteeName">Name:</label>
                    <input onChange={handleChange} type="text" name="trusteeName"/>
                    <label htmlFor='trusteeEmail'>Email:</label>
                    <input onChange={handleChange} type="email" name="trusteeEmail"/>
                    <button type="submit" className="btn btn-primary rounded-6 my-4">Submit</button>
                </form>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h2>My Drafts</h2>
                {projects && <ul>{projects.res.data.map((project, idx) => <li key={idx}>{project.Title}</li>)}</ul>}
            </div>
        </div>
    )
}
