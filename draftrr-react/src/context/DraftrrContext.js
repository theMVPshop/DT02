import React, { useState, createContext, useEffect } from 'react'
import axios from 'axios'

export const DraftrrContext = createContext()

export function DraftrrProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({})
    const [currentProject, setCurrentProject] = useState({})
    const [currentTextFile, setCurrentTextFile] = useState({})

    const [userProjects, setUserProjects] = useState([])
    // const [userTextFiles, setUserTextFiles] = useState([])
    const [newProject, setNewProject] = useState({
                    title: '',
                    timeFrame: 0,
                    maxCharacters: 0,
                    font: '',
                    trusteeName: '',
                    trusteeEmail: '',
                    textID: '',
                    userID: ''
})


    const createProject = (payload) => {
        
        
        axios.post(`http://localhost:4000/projects`, payload).then(res => {console.log('project created!', res)})
    }


    const createTextFile = (user) => {
        
        const payload = {text: ''}
        axios.post(`http://localhost:4000/text/create`, payload)
                    .then(res => {
                        const newState = newProject
                        newState.textID = res.data.id
                        console.log('user id', user.id)
                        newState.userID = user.id
                        setNewProject(newState)
                        console.log('new project', newProject)
                    }).then(res => {
                        createProject(newProject)
                    })
        

    }

                      
                                                                            // setNewProject(textID => ({
                                                                            // ...textID, 
                                                                            // [textID]: res.data.id
                                                                            // })); console.log('new project', newProject)

    const value = {
        currentUser,
        setCurrentUser,
        currentProject,
        setCurrentProject,
        userProjects,
        setUserProjects,
        createProject,
        newProject,
        setNewProject,
        createTextFile
    }

    return (
        <DraftrrContext.Provider value={value}>
            {children}
        </DraftrrContext.Provider>
    )
}