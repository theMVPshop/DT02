import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { auth } from '../firebase'

export const DraftrrContext = React.createContext()

export function DraftrrProvider({ children }) {
    const [loginOpen, setLoginOpen] = useState(false)
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [newUser, setNewUser] = useState(false)
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [document, setDocument] = useState({text: ''})
    const [credentials, setCredentials] = useState({
        email: '',
        username: '',
        password: '',
        passwordConfirm: ''
    })
    // const [newProject, setNewProject] = useState({
        
    //     title: '',
    //     timeFrame: 20,
    //     maxCharacters: 50,
    //     font: 'helvetica',
    //     trusteeName: '',
    //     trusteeEmail: '',
    //     textID: '',
    //     userID: '',
    //     locked: true,
    //     submitted: false
    // })
    const [newDraft, setNewDraft] = useState(false)
    const [projects, setProjects] = useState()
    const [currentTextFile, setCurrentTextFile] = useState({})
    const [currentProject, setCurrentProject] = useState({
        id: 0,
        title: '',
        timeFrame: 10,
        maxCharacters: 200,
        font: 'helvetica',
        trusteeName: '',
        trusteeEmail: '',
        textID: '',
        userID: '',
        locked: true,
        submitted: false
    })

    function handleCredentials(event) {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
        console.log(credentials)
    };

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password).then(() => {
            setNewUser(true)
        })
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(newEmail) {
        return auth.currentUser.updateEmail(newEmail).then(() => {
            updateUser()
        })
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password).then(() => {
            updateUser()
        })
    }

    function updateProfile(username) {
        return auth.currentUser.updateProfile({ displayName: username }).then(() => {
            // updateUser()
        })
    }

    function createUser() {
                    const payload = {
                    id: currentUser.uid,
                    name: credentials.username,
                    email: currentUser.email,
                    theme: 'light',
                    timeFrame: 0,
                    maxCharacters: 0,
                    font: '',
                    newUser: true
                }
        axios.post(`http://localhost:4000/users/`, payload)
            .then(res => console.log('user created', res))
            .then(() => setIsLogin(true))
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    })

    useEffect(() => {
        newUser && createUser()
    }, [currentUser])

    useEffect(() => {
        console.log('current project', currentProject)
    }, [currentProject])


    const createProject = (payload) => {
        axios.post(`http://localhost:4000/projects`, payload)
        .then(res => { console.log('project created!', res) 
            const newState = payload
            newState.id = res.data.newId
            
            setCurrentProject(newState)
            
    
        })
    }

    useEffect(() => {
        return currentProject
    }, [currentProject])


    const createTextFile = () => {
        const payload = { text: '' }
        
        axios.post(`http://localhost:4000/text/create`, payload)
            .then(res => {
                
                let newState = currentProject
                newState.textID = res.data.id
                console.log('user id', currentUser.uid)
                newState.userID = currentUser.uid
                newState.locked = true
                newState.submitted = false
                console.log('current project', currentProject)
                
                
            }).then(res => {
                
                createProject(currentProject)
            })
    }

    const updateTextFile = (payload) => {
        console.log('text', currentProject)
        axios.put(`http://localhost:4000/text/${currentProject.textID}`, payload)
            .then(res => {
                console.log('response', res.config.data)
            })
    }

    const updateProject = () => {
        const payload = currentProject
        axios.put(`http://localhost:4000/projects/${currentProject.id}`, payload)
            .then(res => {
                console.log('project updated!', res)
            })
    }

    const updateUser = () => {
        console.log("updating user info")
        const payload = {
                    username: currentUser.displayName,
                    email: currentUser.email,
                }
        axios.put(`http://localhost:4000/users/${currentUser.uid}`, payload)
            .then(res => {
                console.log('user updated!', res)
            })
    }

    const deleteProject = (sqlID, textID, idx) => {
        
        axios.delete(`http://localhost:4000/projects/${sqlID}`)
            .then(res => {
                console.log('SQL entry deleted!', res)
            })
        axios.delete(`http://localhost:4000/text/${textID}`)
            .then(res => {
                console.log('mongo entry deleted!', res)
            })
            .then(res => {
                const newState = projects 
                newState.splice(idx, 1)
                setProjects([...newState])
            })
    }

    const getProject = (id) => {
        axios.get(`http://localhost:4000/projects/${id}`)
            .then(res => {
                return res
            })
    }

    const getDraft = (id) => {
        
        axios.get(`http://localhost:4000/text/${id}`)
            .then(res => {
                
                console.log('getting project', res.data.text)
                
                return res
            })

    }

    

    const value = {
        currentUser,
        credentials,
        setCredentials,
        handleCredentials,
        updateProfile,
        signup,
        login,
        logout,
        updateEmail,
        updatePassword,
        resetPassword,
        loginOpen,
        setLoginOpen,
        settingsOpen,
        setSettingsOpen,
        isLogin,
        setIsLogin,
        isForgotPassword,
        setIsForgotPassword,
        currentUser,
        createUser,
        setNewUser,
        // newProject,
        // setNewProject,
        createTextFile,
        newDraft,
        setNewDraft,
        loading,
        setLoading,
        projects,
        setProjects,
        document,
        setDocument,
        updateTextFile,
        updateProject,
        currentProject,
        setCurrentProject,
        deleteProject,
        getDraft,
        getProject
    }

    return (
        <DraftrrContext.Provider value={value}>
            {!loading && children}
        </DraftrrContext.Provider>
    )
}
