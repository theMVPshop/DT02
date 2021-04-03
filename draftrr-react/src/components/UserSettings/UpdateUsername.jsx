import {useState, useContext, useEffect} from 'react'
import {DraftrrContext} from '../../context/DraftrrContext'

export const UpdateUsername = () => {
    const {updateProfile} = useContext(DraftrrContext)
    const [error, setError] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [loading, setLoading] = useState(false)
    const [usernames, setUsernames] = useState({
        newUsername: '',
        newUsernameConfirm: ''
    })

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
            await updateProfile(usernames.newUsername)
            setConfirmation('Username changed.')
        } catch {
            setError('Failed to update username.')
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
                <h3>Update Username</h3>

                <div className="form-group">
                    <label>New Username</label>
                    <input type="text" className="form-control" placeholder="Enter new username" name="newUsername" onChange={handleUsernames} autoFocus/>
                </div>

                <div className="form-group">
                    <label>Confirm New Username</label>
                    <input type="text" className="form-control" placeholder="Re-enter new username" name="newUsernameConfirm" onChange={handleUsernames} />
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