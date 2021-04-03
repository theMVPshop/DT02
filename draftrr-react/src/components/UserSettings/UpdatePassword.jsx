import {useState, useContext, useEffect} from 'react'
import {DraftrrContext} from '../../context/DraftrrContext'

import axios from 'axios'

export const UpdatePassword = () => {
    const {updatePassword, checkPassword} = useContext(DraftrrContext)
    const [error, setError] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [loading, setLoading] = useState(false)
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
    })

    function handlePasswords(event) {
        setPasswords({ ...passwords, [event.target.name]: event.target.value })
    };

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwords.newPassword !==
            passwords.newPasswordConfirm) {
            return setError('Passwords do not match.')
        }

        try {
            setError('')
            await updatePassword(passwords.newPassword)
            setConfirmation('Password changed.')
        } catch {
            setError('Failed to reset password.')
        }
    }

    return (
        <div>
            {confirmation !== '' 
            ?   <div>
                    <h3>Success!</h3>
                    <span style={{color: "green"}}>{`${confirmation} `}</span>
                </div>
            : <form onSubmit={handleSubmit}>
                <h3>Reset Password</h3>
                
                <div className="form-group">
                    <label>Current Password</label>
                    <input type="password" className="form-control" placeholder="Enter new password" name="currentPassword" onChange={handlePasswords} autoFocus/>
                </div>

                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" className="form-control" placeholder="Enter new password" name="newPassword" onChange={handlePasswords} autoFocus/>
                </div>

                <div className="form-group">
                    <label>Confirm New Password</label>
                    <input type="password" className="form-control" placeholder="Re-enter new password" name="newPasswordConfirm" onChange={handlePasswords} />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                {error !== '' && 
                    <div>
                        <br/>
                        <span style={{color: "red"}}>{`${error} `}</span>
                    </div>}
             </form> 
            }
               
        </div>
    )
}