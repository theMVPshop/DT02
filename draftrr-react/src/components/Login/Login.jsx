import {useState, useContext, useEffect} from 'react'
import {DraftrrContext} from '../../context/DraftrrContext'
import netlifyIdentity from "netlify-identity-widget"
import axios from 'axios'

netlifyIdentity.init()

export const Login = () => {

    const [isAlreadyUser, setIsAlreadyUser] = useState()
    const {currentUser, setCurrentUser} = useContext(DraftrrContext)

    useEffect(() => {
        getUserByID()
        console.log('useEffect', currentUser)


    }, [currentUser] )

    const getUserByID = (user) => {
        console.log("function is running", currentUser)
        axios.get(`http://localhost:4000/users/${currentUser.id}`).then( res => currentUser.id !== res.data.id ? createUser(currentUser) : null)
        
        // axios.post(`http://localhost:4000/users/`).then( res => setUserID({data : res}))
        
        
    }

    const createUser = (user) => {
        console.log('current user', currentUser)
        axios.post(`http://localhost:4000/users/`, user)
        .then( res => console.log('user created', res))
    }



    const handleClick = () => {
        netlifyIdentity.open()
        
         netlifyIdentity.on("login", user => {
            const payload = {
                            id: user.id,
                            name: user.user_metadata.full_name,
                            email: user.email,
                            theme: 'light',
                            timeFrame: 0,
                            maxCharacters: 0,
                            font: '',
                            newUser: true}
            
            setCurrentUser(payload)
            console.log('after setting current user', currentUser)
            
        })
    }

    return (
        <a href="javascript:;">
            <div onClick={handleClick}>Login</div>
        </a>
    )
}
