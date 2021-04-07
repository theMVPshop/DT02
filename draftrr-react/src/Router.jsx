import { Switch, Route } from "react-router"
import Home from "./components/Home"
import About from "./components/About"
import Dashboard from "./components/Dashboard"
// import { Dashboard2 } from "./components/Dashboard/Dashboard2.jsx"
import Editor from "./components/Editor"
import Settings from "./components/Settings"
import { NewDraftForm } from "./components/Editor/NewDraftForm"
import DraftViewer from './components/DraftViewer/DraftViewer'


export const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/dashboard" component={Dashboard} />
            {/* <Route path="/dashboard2" component={Dashboard2} /> */}
            <Route path="/newdraft/" component={NewDraftForm} />
            <Route path="/editor/:idProjects/:textID" component={Editor} />
            <Route path="/settings" component={Settings} />
            <Route path="/form" component={NewDraftForm} />
            <Route path="/draftviewer/:idProjects/:textID" component={DraftViewer} />
        </Switch>
    )
}
