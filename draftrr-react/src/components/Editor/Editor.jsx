import { useState, useEffect, useRef, useContext } from "react"
import { DraftrrContext } from "../../context/DraftrrContext"

import Modal from "react-bootstrap/Modal"

import { NewDraftForm } from "./NewDraftForm"

import "./Editor.scss"

let interval

export const Editor = () => {
    const [ newDraft, setNewDraft ] = useState(true)
    const [ editable, setEditable ] = useState([])
    const [ locked, setLocked ] = useState([])
    const [ time, setTime ] = useState(5)

    const [ letters, setLetters ] = useState([])
    const [ charLimit, setCharLimit ] = useState(3)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const { document, setDocument, createProject, createTextFile, currentUser, newProject, setNewProject, } = useContext(DraftrrContext)

    useEffect(() => {
        initialize()
    }, [])

    //initial functions for when the session begins
    const initialize = () => { 
        if(!newDraft) {
            window.addEventListener("keydown", handleKeyDown) 
            interval = setInterval(checkTimeStamps, 100)
        }
    } 
    
    //save progress and keep working
    const handleSave = () => {combineDoc()} 
    
    // clear interval, save document and exit session
    const handleSaveAndExit = () => {
        clearInterval(interval); 
        handleSave()
    } 
    
    //clear interval, save document and upload to DB
    const handleSubmit = () => {handleSaveAndExit()} 
    
    //possible interval for autosaving progress, still thinking on this one
    const autoSave = () => {} 

    const handleKeyDown = (e) => {
        const keycode = e.charCode || e.keyCode
        let current = editable

        if (keycode  > 36 && keycode < 41 ) { 
            return false
        }
        if (keycode === 8) {
            current.pop()
            setEditable([...current])
        } else if (
            keycode !== 16 && 
            keycode !== 91 &&
            keycode !== 46 && 
            keycode !== 17 && 
            keycode !== 18 && 
            keycode !== 38 && 
            keycode !== 37 && 
            keycode !== 39 && 
            keycode !== 40 && 
            keycode !== 93 &&
            keycode !== 27 &&
            keycode !== 9 &&
            keycode !== 20 &&
            keycode !== 13
            ) { 
            const keyValue = {
                key: e.key,
                timestamp: Date.now()
            }
            current.push(keyValue)
            setEditable([...current])
        }
        if ( e.which == 13 ) {
            e.preventDefault()
        }
    }

    const checkTimeStamps = () => {
        let newEditable = editable
        let newLocked = locked
        newEditable.forEach((item, index) => {
            if (item.timestamp < Date.now() - (newProject.timeFrame * 1000)) {
                let removed = newEditable.splice(index, 1)
                newLocked.push(removed[0])
                setEditable([...newEditable])
                setLocked([...newLocked])
            } 
        })
    }

    const combineDoc = () => {
        const final = [...locked, ...editable]
        const mappedChars = final.map((char) => {
            return char.key
        })
        setDocument(mappedChars.join(""))
    }

    //handle update draft settings form
    const handleUpdate = (event) => {
        setNewProject(previousValues => ({
            ...previousValues, 
            [event.target.name]: event.target.value
        }))
    }

    return (
        <div className="body-container editor-container p-5">
            {newDraft ?
                <NewDraftForm setNewDraft={setNewDraft}  />
                : 
                <>
                    <div className="d-flex justify-content-between align-items-center">
                        <button onClick={handleShow}>Draft Settings</button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Draft Settings</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="d-flex flex-column">
                                <label htmlFor="updateTitle">Title:</label>
                                <input value={newProject.title} onChange={handleUpdate} type="text" id="updateTitle" autoFocus required/>
                                <label htmlFor="updateTimeFrame">Seconds Editable:</label>
                                <input value={newProject.timeFrame} onChange={handleUpdate} type="number" id="updateTimeFrame" required/>
                                <label htmlFor="updateMaxCharacters">Maximum Visible Characters:</label>
                                <input value={newProject.maxCharacters} onChange={handleUpdate} type="number" id="updateMaxCharacters" required/>
                                <label htmlFor="updateTrusteeName">Name:</label>
                                <input value={newProject.trusteeName} onChange={handleUpdate} type="text" id="updateTrusteeName" required/>
                                <label htmlFor="updateTrusteeEmail">Email:</label>
                                <input value={newProject.trusteeEmail} onChange={handleUpdate} type="email" id="updateTrusteeEmail" required/>
                            </Modal.Body>
                            <Modal.Footer>
                                <div className="btn btn-secondary" onClick={handleClose}>
                                    Close
                                </div>
                                <div className="btn btn-primary" onClick={handleClose}>
                                    Save Changes
                                </div>
                            </Modal.Footer>
                        </Modal>               
                        <div className="d-flex flex-column align-items-center">
                            <div className="font-weight-bold">{newProject.title}</div>
                        </div>
                        <div>
                            <button onClick={handleSave} className="mr-2">Save Progress</button>
                            <button onClick={handleSaveAndExit} className="mr-2">Save For Later</button>
                            <button onClick={handleSubmit} className="btn btn-primary rounded-6">Submit</button>
                        </div>
                    </div>
                    <div id="mainTextBox">
                        <span>
                            {locked[0] && locked.map(item => <>{item.key}</>)}
                        </span>
                        <span>
                            {editable[0] && editable.map(item => <>{item.key}</>)}
                        </span>
                        <span className="flashing">|</span>
                    </div>
                </>
            }
        </div>
    )
}
