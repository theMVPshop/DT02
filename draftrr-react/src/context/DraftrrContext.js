import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { auth } from '../firebase'

export const DraftrrContext = React.createContext()

export function DraftrrProvider({ children }) {
    const [loginOpen, setLoginOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [newUser, setNewUser] = useState(false)
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [document, setDocument] = useState([])
    const [credentials, setCredentials] = useState({
        email: '',
        username: '',
        password: '',
        passwordConfirm: ''
    })
    const [newProject, setNewProject] = useState({
        title: '',
        timeFrame: 20,
        maxCharacters: 50,
        font: 'helvetica',
        trusteeName: '',
        trusteeEmail: '',
        textID: '',
        userID: ''
    })
    const [newDraft, setNewDraft] = useState(false)
    const [projects, setProjects] = useState()
    const [currentTextFile, setCurrentTextFile] = useState({})
    const [currentProject, setCurrentProject] = useState({})

    function handleCredentials(event) {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
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

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function updateProfile(username) {
        return auth.currentUser.updateProfile({
            displayName: username
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


    const createProject = (payload) => {
        axios.post(`http://localhost:4000/projects`, payload).then(res => { console.log('project created!', res) })
    }

    const createTextFile = () => {
        const payload = { text: '' }
        axios.post(`http://localhost:4000/text/create`, payload)
            .then(res => {
                console.log(currentUser)
                const newState = newProject
                newState.textID = res.data.id
                console.log('user id', currentUser.uid)
                newState.userID = currentUser.uid
                setNewProject(newState)
                console.log('new project', newProject)
            }).then(res => {
                createProject(newProject)
                setNewProject({
                    title: '',
                    timeFrame: 20,
                    maxCharacters: 500,
                    font: '',
                    trusteeName: '',
                    trusteeEmail: '',
                    textID: '',
                    userID: ''
                })
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
        resetPassword,
        updateEmail,
        updatePassword,
        loginOpen,
        setLoginOpen,
        isLogin,
        setIsLogin,
        currentUser,
        createUser,
        setNewUser,
        newProject,
        setNewProject,
        createTextFile,
        newDraft,
        setNewDraft,
        loading,
        setLoading,
        projects,
        setProjects,
        document,
        setDocument
    }

    return (
        <DraftrrContext.Provider value={value}>
            {!loading && children}
        </DraftrrContext.Provider>
    )
}
