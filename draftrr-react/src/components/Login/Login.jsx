import netlifyIdentity from "netlify-identity-widget"

netlifyIdentity.init()

export const Login = () => {

    const handleClick = () => {
        netlifyIdentity.open()
        netlifyIdentity.on("login", user => {
            console.log(user)
            console.log("email: ", user.email)
            console.log("name: ", user.user_metadata.full_name)
        })
    }

    return (
        <button onClick={handleClick}>Login</button>
    )
}
