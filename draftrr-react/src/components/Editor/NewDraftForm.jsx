import { useState, useContext, useEffect } from 'react'
import { DraftrrContext } from "../../context/DraftrrContext"
import "./Editor.scss"
import { Link, useHistory } from 'react-router-dom'

export const NewDraftForm = () => {
    const { createTextFile, currentUser, currentProject, setCurrentProject } = useContext(DraftrrContext)

    const history = useHistory();
    
    const handleChange = (event) => {
        setCurrentProject(previousValues => ({
            ...previousValues, 
            [event.target.name]: event.target.value
        }))
    }

    useEffect(() => {
        if(currentProject.idProjects) {
            history.push(`/editor/${currentProject.idProjects}/${currentProject.Text_ID}`)
        }
    }, [currentProject])

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("current user: ", currentUser)
        createTextFile()
    }

    console.log(currentProject)

    return (
        <div className="body-container editor-container p-5">
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center justify-content-center">
                <h1 className="text-center my-4 text-primary">New Draft</h1>
                <p>Let's set up a new draft!</p>
                
                <label htmlFor="title">Title:</label>
                <input value={currentProject.Title} onChange={handleChange} placeholder="Enter title" type="text" id="title" name="Title" autoFocus required/>
                
                <label htmlFor="timeFrame">Seconds Editable: <span className="font-weight-normal">{currentProject.ProjectTimeframe}</span></label>
                <input type="range" id="timeFrame" name="ProjectTimeframe" value={currentProject.ProjectTimeframe} onChange={handleChange} />
                {/* <input value={currentProject.timeFrame} onChange={handleChange} type="number" id="timeFrame" name="timeFrame" required/> */}
            
                <label htmlFor="maxCharacters">Maximum Visible Characters: <span className="font-weight-normal">{currentProject.ProjectMaxCharacters}</span></label>
                <input type="range" id="maxCharacters" name="ProjectMaxCharacters" min="100" max="1000" value={currentProject.ProjectMaxCharacters} onChange={handleChange} />
                {/* <input value={currentProject.maxCharacters} onChange={handleChange} type="number" id="maxCharacters" name="maxCharacters" required/> */}

                <h3 className="text-center mt-3">Trustee</h3>
                <label htmlFor="trusteeName">Name:</label>
                <input value={currentProject.TrusteeName} onChange={handleChange} placeholder="Enter trustee name" type="text" id="trusteeName" name="TrusteeName" required/>
                
                <label htmlFor="trusteeEmail">Email:</label>
                <input value={currentProject.TrusteeEmail} onChange={handleChange} placeholder="Enter trustee email" type="email" id="trusteeEmail" name="TrusteeEmail" required/>
                
                    <button type="submit" className="btn btn-primary rounded-6 my-4">Submit</button>
                
                
            </form>
        </div>
    )
}
