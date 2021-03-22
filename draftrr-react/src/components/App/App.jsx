import { BrowserRouter } from "react-router-dom"

import { Router } from "../../Router.jsx"
import Header from "../Header"
import Footer from "../Footer"


// import Login from "../Login"

import "./App.scss"

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Router />
      <Footer />
      {/* <Login /> */}
    </BrowserRouter>
  )
}
