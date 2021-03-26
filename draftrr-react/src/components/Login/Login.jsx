import {useState} from 'react'
import netlifyIdentity from "netlify-identity-widget"
import axios from 'axios'

netlifyIdentity.init()

export const Login = () => {

    const [userID, setUserID] = useState()

    const getUserByID = (id) => {
        axios.get(`http://localhost:4000/users/${id}`).then( res => setUserID({data : res}))
        
        // axios.post(`http://localhost:4000/users/`).then( res => setUserID({data : res}))
        
        console.log('user ID', userID)


    }



    const handleClick = () => {
        netlifyIdentity.open()
        
        netlifyIdentity.on("login", user => {
            console.log('user', user.id)
            getUserByID(user.id)
            
        })
    }

    return (
        <a href="javascript:;">
            <div onClick={handleClick}>Login</div>
        </a>
    )
}
