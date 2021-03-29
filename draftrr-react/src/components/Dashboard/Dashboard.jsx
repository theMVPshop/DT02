import {useState, useContext} from 'react'
import "./Dashboard.scss"
import axios from 'axios'
import {DraftrrContext} from '../../context/DraftrrContext'

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
        console.log('current user', currentUser)
        createTextFile(currentUser)

        // createProject(newProject)
    }

   


    return (
        <div  style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>Dashboard</div>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '50px'}}>
                <button onClick={handleGetUser}>GET USER</button>
                <button onClick={handleGetProjects}>GET PROJECTS</button>
                <button onClick={handleGetTextFiles}>GET TEXT FILES</button>

            <br/>
            
                

            </div>

            <div>
                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', width: '200px', justifyContent: 'center', height: '500px'}}>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>Form</div>
                    <label htmlFor='title'>Title: </label>
                    <input onChange={handleChange} type='text' name='title'/>
                    <label htmlFor='timeFrame'>Timeframe: </label>
                    <input onChange={handleChange} type='number' name='timeFrame'/>
                    <label htmlFor='maxCharacters'>Max Characters: </label>
                    <input onChange={handleChange} type='number' name='maxCharacters'/>
                    <label  htmlFor='font'>Font: </label>
                    <input onChange={handleChange} type='text' name='font'/>
                    <label htmlFor='trusteeName'>Trustee Name: </label>
                    <input onChange={handleChange} type='text' name='trusteeName'/>
                    <label htmlFor='trusteeEmail'>Trustee Email: </label>
                    <input onChange={handleChange} type='email' name='trusteeEmail'/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <h1>Projects</h1>
                {projects && <ul>{projects.res.data.map((project, idx) => <li key={idx}>{project.Title}</li>)}</ul>}
            </div>
            
        </div>
    )
}
