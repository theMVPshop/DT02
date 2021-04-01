import { useState, useContext, useEffect } from "react"
import { DraftrrContext } from '../../context/DraftrrContext'
import ListGroup from 'react-bootstrap/ListGroup'
import { FaCog, FaFileDownload, FaPlay, FaRedo } from "react-icons/fa";
import { Link } from "react-router-dom"
import "./Dashboard.scss"

const dummyList = ["Draft 1", "Draft 2", "Draft 3", "Draft 4"]


export const Dashboard2 = () => {

    const {currentUser, loading, setLoading, projects, setProjects} = useContext(DraftrrContext)

    const uid = currentUser.uid
    const name = currentUser.displayName

    return (
        <div className="container body-container d-flex flex-column align-items-center border border-primary">
            <h1 className=" my-4 text-primary">Dashboard</h1>
            <h3>{`Hello, ${name}`}</h3>
            <div className="mb-5">
                {/* <button onClick={handleGetTextFiles}>Get Text Files</button>             */}
                <button >Get Text Files</button>            
            </div>
            <div className="container-fluid d-flex w-50 justify-content-between border border-secondary">
                <Link to="/editor" className="btn btn-primary rounded-6 mb-5">
                    New Draft
                </Link>
                <Link to="/editor" className="btn btn-primary rounded-6 mb-5">
                <FaCog />
                </Link>
            </div>
                <h2>My Drafts</h2>
            <div className="container-fluid w-50 d-flex flex-column justify-content-center align-items-center border border-secondary">
                {/* {projects && <ul>{projects.map((project, idx) => <li key={idx}>{project.Title}</li>)}</ul>} */}
                <ListGroup>
                    {dummyList.map(draft => {
                        return (
                            <div className="d-flex align-items-center justify-content-end"><ListGroup.Item>{draft}</ListGroup.Item> <FaPlay /><FaFileDownload /> <FaCog /></div>
                        )
                    })}
                </ListGroup>    
            </div>
        </div>
    )
}
