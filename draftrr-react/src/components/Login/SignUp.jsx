import {useState, useContext, useEffect} from 'react'
import {DraftrrContext} from '../../context/DraftrrContext'

import axios from 'axios'

export const SignUp = () => {
    const { signup, updateProfile, credentials, handleCredentials, setLoginOpen, setNewUser } = useContext(DraftrrContext)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(credentials.email, credentials.password)

        if (credentials.password !==
            credentials.passwordConfirm) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(credentials.email, credentials.password, credentials.username)
                .then(() => {
                    updateProfile(credentials.username)
                })
        } catch {
            setError('Failed to create an account')
            setLoading(false)
        }
        setLoginOpen(false)
    }

    return (
        <div>  
            <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Username" name="username" onChange={handleCredentials} />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={handleCredentials} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={handleCredentials} />
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="passwordConfirm" onChange={handleCredentials} />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            </form>
    </div>
    )
}