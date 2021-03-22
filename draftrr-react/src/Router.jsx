import { Switch, Route } from "react-router"
import Home from "./components/Home"
import About from "./components/About"
import Dashboard from "./components/Dashboard"
import Editor from "./components/Editor"
import Settings from "./components/Settings"

export const Router = () => {
    return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/editor" component={Editor} />
                <Route path="/settings" component={Settings} />
            </Switch>
    )
}
