import { useState, useContext } from 'react'
import { DraftrrContext } from "../../context/DraftrrContext"

import * as FormStyles from "./Form.module.scss"

export const NewDraftForm = ({ setNewDraft }) => {
    const { createProject, createTextFile, currentUser, newProject, setNewProject, } = useContext(DraftrrContext)
    
    const handleChange = (event) => {
        setNewProject(previousValues => ({
            ...previousValues, 
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("current user: ", currentUser)
        createTextFile()
        setNewDraft(false)
    }

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center justify-content-center">
            <h1 className="text-center my-4 text-primary">New Draft</h1>
            <p>Let's set up a new draft!</p>
            <label htmlFor="title">Title:</label>
            <input value={newProject.title} onChange={handleChange} type="text" id="title" name="title" autoFocus required/>
            <label htmlFor="timeFrame">Seconds Editable:</label>
            <input value={newProject.timeFrame} onChange={handleChange} type="number" id="timeFrame" name="timeFrame" required/>
            <label htmlFor="maxCharacters">Maximum Visible Characters:</label>
            <input value={newProject.maxCharacters} onChange={handleChange} type="number" id="maxCharacters" name="maxCharacters" required/>
            <h3 className="text-center mt-3">Trustee</h3>
            <label htmlFor="trusteeName">Name:</label>
            <input value={newProject.trusteeName} onChange={handleChange} type="text" id="trusteeName" name="trusteeName" required/>
            <label htmlFor="trusteeEmail">Email:</label>
            <input value={newProject.trusteeEmail} onChange={handleChange} type="email" id="trusteeEmail" name="trusteeEmail" required/>
            <button type="submit" className="btn btn-primary rounded-6 my-4">Submit</button>
        </form>
    )
}
