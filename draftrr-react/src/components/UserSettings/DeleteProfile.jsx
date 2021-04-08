import {useState, useContext, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import {DraftrrContext} from '../../context/DraftrrContext'

export const DeleteProfile = () => {
    const {deleteUser, setIsSetting, setSettingsOpen} = useContext(DraftrrContext)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [usernames, setUsernames] = useState({
        newUsername: '',
        newUsernameConfirm: ''
    })
    const history = useHistory()

    function handleUsernames(event) {
        setUsernames({ ...usernames, [event.target.name]: event.target.value })
    };

    async function handleSubmit(e) {
        e.preventDefault()

        if (usernames.newUsername !==
            usernames.newUsernameConfirm) {
            return setError('Names do not match.')
        }

        try {
            setError('')
            await deleteUser()
            setSettingsOpen(false)
            history.push('/')
        } catch {
            setError('Failed to delete profile.')
        }
    }

    function handleBack() {
        setIsSetting(false)
    }

    return (
        <div>
             <form onSubmit={handleSubmit}>
                <h3>Delete Profile</h3>

                <div style={{margin: "20px 0"}}>Are you sure? You will lose all your hard work.</div>

                <button type="submit" className="btn btn-secondary btn-block">Yes, delete profile</button>
                {error !== '' && 
                    <div>
                        <br/>
                        <span style={{color: "red"}}>{`${error} `}</span>
                    </div>}
                    <button className="btn btn-primary btn-block" onClick={handleBack}>No, take me back!</button>
             </form> 
        </div>
    )
}