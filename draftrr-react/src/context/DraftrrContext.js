import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { db, auth } from '../firebase'


export const DraftrrContext = React.createContext()

export function DraftrrProvider({ children }) {
    const [currentPage, setCurrentPage] = useState("")
    const [loginOpen, setLoginOpen] = useState(false)
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [isSetting, setIsSetting] = useState(false)
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [document, setDocument] = useState('')
    const [credentials, setCredentials] = useState({
        email: '',
        username: '',
        password: '',
        passwordConfirm: ''
    })
    const [newDraft, setNewDraft] = useState(false)
    const [projects, setProjects] = useState()
    const [currentProject, setCurrentProject] = useState({
        Title: '',
        ProjectTimeframe: 10,
        ProjectMaxCharacters: 200,
        TrusteeName: '',
        TrusteeEmail: '',
        Text_ID: '',
        Users_ID: '',
        Locked: true,
        Submitted: false,
        Username: ''
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

    function deleteUser() {
        return auth.currentUser.delete().then(() => {
            console.log("User deleted")
        }).catch((error) => {
            console.log("user was not deleted")
        })
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

                let newState = JSON.parse(res.config.data)
                newState.idProjects = res.data.newId
                setCurrentProject(newState)

            })
    }

    useEffect(() => {
        return currentProject
    }, [currentProject])

    const createTextFile = () => {
        const payload = { text: '' }
        let newState = currentProject
        axios.post(`http://localhost:4000/text/create`, payload)
            .then(res => {


                newState.Text_ID = res.data.id
                console.log('user id', currentUser.uid)
                newState.Users_ID = currentUser.uid
                newState.Locked = true
                newState.Submitted = false
                newState.Username = currentUser.displayName
                console.log('current project', currentProject)
            }).then(res => {

                createProject(newState)
            })
    }

    const updateTextFile = (payload) => {

        axios.put(`http://localhost:4000/text/${currentProject.Text_ID}`, payload)
            .then(res => {
                console.log('text file updated!', JSON.parse(res.config.data).text)
                setDocument(JSON.parse(res.config.data).text)
            })
    }

    const updateProject = () => {
        const payload = currentProject
        axios.put(`http://localhost:4000/projects/${currentProject.idProjects}`, payload)
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
        currentPage, setCurrentPage,
        currentUser,
        credentials,
        setCredentials,
        handleCredentials,
        updateProfile,
        signup,
        login,
        logout,
        deleteUser,
        updateEmail,
        updatePassword,
        resetPassword,
        loginOpen,
        setLoginOpen,
        settingsOpen,
        setSettingsOpen,
        isLogin,
        setIsLogin,
        isSetting,
        setIsSetting,
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
