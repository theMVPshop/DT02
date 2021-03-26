import React, { useState, createContext, useEffect } from 'react'

export const DraftrrContext = createContext()

export function DraftrrProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({
        id: '',
        name: '',
        email: '',
        theme: 'light',
        timeFrame: 0,
        maxCharacters: 0,
        font: '',
        newUser: true,
    })

    const [project, setProject] = useState({
        title: '',
        timeFrame: 0,
        maxCharacters: 0,
        font: '',
        trusteeName: '',
        trusteeEmail: '',
        textID: '',
        userID: ''
    })

    const [userProjects, setUserProjects] = useState([])

    const value = {
        currentUser,
        setCurrentUser,
        project,
        setProject,
        userProjects,
        setUserProjects
    }

    return (
        <DraftrrContext.Provider value={value}>
            {children}
        </DraftrrContext.Provider>
    )
}