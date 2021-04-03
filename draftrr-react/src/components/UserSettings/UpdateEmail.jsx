import {useState, useContext, useEffect} from 'react'
import {DraftrrContext} from '../../context/DraftrrContext'

export const UpdateEmail = () => {
    const {updateEmail} = useContext(DraftrrContext)
    const [error, setError] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [loading, setLoading] = useState(false)
    const [emails, setEmails] = useState({
        newEmail: '',
        newEmailConfirm: ''
    })

    function handleEmails(event) {
        setEmails({ ...emails, [event.target.name]: event.target.value })
    };

    async function handleSubmit(e) {
        e.preventDefault()

        if (emails.newEmail !==
            emails.newEmailConfirm) {
            return setError('Emails do not match.')
        }

        try {
            setError('')
            await updateEmail(emails.newEmail)
            setConfirmation('Email changed.')
        } catch {
            setError('Failed to update email.')
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
                <h3>Update Email</h3>

                <div className="form-group">
                    <label>New Email</label>
                    <input type="email" className="form-control" placeholder="Enter new email address" name="newEmail" onChange={handleEmails} autoFocus/>
                </div>

                <div className="form-group">
                    <label>Confirm New Email</label>
                    <input type="email" className="form-control" placeholder="Re-enter new email address" name="newEmailConfirm" onChange={handleEmails} />
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