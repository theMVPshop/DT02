import {useState, useContext, useEffect} from 'react'
import { useHistory } from "react-router-dom"
import {DraftrrContext} from '../../context/DraftrrContext'

export const Login = () => {
    const {login, credentials, handleCredentials, setLoginOpen, setIsForgotPassword} = useContext(DraftrrContext)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(credentials.email, credentials.password)
            history.push('/dashboard2')
            setLoginOpen(false)
        } catch {
            setError('Failed to log in.')
            setLoading(false)
        }
    }

    const handleForgotPassword = () => {
        setIsForgotPassword(true)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={handleCredentials} autoFocus/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={handleCredentials} />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Log In</button>
            {error !== '' && 
                <div>
                    <br/>
                    <span style={{color: "red"}}>{`${error} `}</span>
                </div>}
            <p className="forgot-password text-right">
                <a onClick={handleForgotPassword} href="#">Forgot password?</a>
            </p>
        </form>    
    </div>
    )
}
