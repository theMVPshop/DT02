import { BrowserRouter } from "react-router-dom"

import { Router } from "../../Router.jsx"
import Header from "../Header"
import Footer from "../Footer"

import "./App.scss"

export const App = () => {
  return (
    <BrowserRouter>
        <div className="Site">
          <Header />
          <div className="Site-content">
            <Router />
          </div>
          <Footer />
        </div>
    </BrowserRouter>
  )
}
