import {useState, useContext, useEffect} from 'react'
import {DraftrrContext} from '../../context/DraftrrContext'

export const ForgotPassword = () => {
    const {resetPassword, credentials, handleCredentials, setIsForgotPassword} = useContext(DraftrrContext)
    const [error, setError] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await resetPassword(credentials.email)
            setConfirmation("Password reset sent. Please check your email for further instructions.")
        } catch {
            setError('Failed to send password reset.')
            setLoading(false)
        }
    }

    return (
        <div>
            {confirmation !== '' 
            ?   <div>
                    <h3>Success!</h3>
                    <span style={{color: "green"}}>{`${confirmation} `}</span>
                </div>
            : <div>
                <p>Enter your email address and we'll send you a link to reset your password.</p>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={handleCredentials} autoFocus/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Send Email</button>
                {error !== '' && 
                    <div>
                        <br/>
                        <span style={{color: "red"}}>{`${error} `}</span>
                    </div>}
                </form>
            </div> } 
        </div>
    )
}