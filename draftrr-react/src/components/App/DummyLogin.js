import React from 'react'

const netlifyIdentity = require('netlify-identity-widget')

netlifyIdentity.init();

export const DummyLogin = () => {
    const handleClick = () => {
        netlifyIdentity.open()
        netlifyIdentity.on('login', user => {
            console.log(user)
            console.log('email: ', user.email)
            console.log('name: ', user.user_metadata.full_name)
        })
    }

    return (
        <div className="App">
            <h2>Draftrr</h2>
            <button onClick={handleClick}>Login</button>
        </div>
    )
}
