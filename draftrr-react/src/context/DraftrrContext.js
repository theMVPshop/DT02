import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { db, auth } from '../firebase'

export const DraftrrContext = React.createContext()

export function DraftrrProvider({ children }) {
    const [loginOpen, setLoginOpen] = useState(false)
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [document, setDocument] = useState({ text: '' })
    const [credentials, setCredentials] = useState({
        email: '',
        username: '',
        password: '',
        passwordConfirm: ''
    })
    const [newDraft, setNewDraft] = useState(false)
    const [projects, setProjects] = useState()
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
        return auth.createUserWithEmailAndPassword(email, password).then(cred => {
            db.collection('users').doc(cred.user.uid).set({
                id: cred.user.uid,
                theme: 'light',
                newUser: true
            })
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
        return auth.currentUser.updateEmail(newEmail)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function updateProfile(username) {
        return auth.currentUser.updateProfile({ displayName: username })
    }

    function updateTheme(theme) {
        return db.collection("users").document(currentUser.uid).update("theme", theme)
    }

    function updateIsNewUser(isNewUser) {
        return db.collection("users").document(currentUser.uid).update("newUser", isNewUser)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    })

    useEffect(() => {
        console.log('current project', currentProject)
    }, [currentProject])

    const createProject = (payload) => {
        axios.post(`http://localhost:4000/projects`, payload)
            .then(res => {
                console.log('project created!', res)
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
        axios.put(`http://localhost:4000/text/${currentProject.Text_ID}`, payload)
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
