import {useState, useContext, useEffect} from 'react'
import {DraftrrContext} from '../../context/DraftrrContext'

import axios from 'axios'

export const LogIn = () => {
    // const {handleLogin} = useContext(DraftrrContext)
    const {login, credentials, handleCredentials, setLoginOpen} = useContext(DraftrrContext)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(credentials.email, credentials.password)
        } catch {
            setError('Failed to log in.')
            setLoading(false)
        }
        setLoginOpen(false)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <h3>Log In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={handleCredentials} />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={handleCredentials} />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Log In</button>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>    
    </div>
    )
}
