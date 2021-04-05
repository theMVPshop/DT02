import { useState, useEffect, useRef, useContext } from "react"
import { DraftrrContext } from "../../context/DraftrrContext"

import Modal from "react-bootstrap/Modal"

import { NewDraftForm } from "./NewDraftForm"

import "./Editor.scss"

let interval

export const Editor = () => {
    const [ newDraft, = ] = useState(true)
    const [ editable, setEditable ] = useState([])
    const [ locked, setLocked ] = useState([])
    const [ visible, setVisible ] = useState([])
    const [ showModal, setShowModal ] = useState(false)

    const { document, setDocument, createProject, createTextFile, currentUser, newProject, setNewProject, updateTextFile, currentProject, setCurrentProject, updateProject} = useContext(DraftrrContext)

    useEffect(() => {
        if(!newDraft) {
            initialize()
        }
    }, [newDraft])

    useEffect(() => {
        console.log('show modal', showModal)
        if(!showModal) {
            initialize()
        } else {
            pause()
        }
    }, [showModal])

    useEffect(() => {
        if(currentProject) {
            setNewDraft(false)
        }
    }, [])

    //initial functions for when the session begins
    const initialize = () => { 
        if(!newDraft) {
            window.addEventListener("keydown", handleKeyDown, true) 
            interval = setInterval(checkTimeStamps, 50)
            console.log('initializing draft')
        }
    } 

    const pause = () => {
        clearInterval(interval); 
        
        console.log('pausing draft')
        console.log('window', window)
        return window.removeEventListener("keydown", handleKeyDown, true)
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
        console.log('handling keydown')
        const keycode = e.charCode || e.keyCode
        let current = editable

        if (keycode  > 36 && keycode < 41 ) { 
            return false
        }
        if (keycode === 8) {
            current.pop()
            setEditable([...current])
            checkMaxCharacters()
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
            keycode !== 20
            ) { 
            const keyValue = {
                key: e.key,
                timestamp: Date.now(),
                isLocked: false,
            }
            
            current.push(keyValue)
            setEditable([...current])
            
            checkMaxCharacters()
        }
        if ( e.which == 13 ) {
            e.preventDefault()
        }
    }

    const checkMaxCharacters = () => {
        let newState = locked.concat(editable).reverse()
        // const newArray = newState.splice((newState.length - 1) - maxCharacters, maxCharacters)
        let newArray = []

            newState.forEach((item, index) => {
                
                if(index < newProject.maxCharacters) {
                    newArray.push(item)
                }
    
            })
        newArray.reverse()
        setVisible([...newArray])

        
        // let newState = [...locked, ...editable]

        // newState.forEach((item, index) => {
        //     if (newState.length >= newProject.maxCharacters) {
        //         newState.shift()
        //     }
        // })
        // setVisible([...newState])
    }
    
    const checkTimeStamps = () => {
        let newEditable = editable
        let newLocked = locked
        newEditable.forEach((item, index) => {
            if (item.timestamp < Date.now() - (newProject.timeFrame * 1000)) {
                let removed = newEditable.splice(index, 1)
                removed[0].isLocked = true
                newLocked.push(removed[0])
                setEditable([...newEditable])
                setLocked([...newLocked])
            } 
        })
    }

    const combineDoc = () => {
        const final = [...locked, ...editable]
        const mappedChars = final.map((char) => char.key)
        setDocument({text: mappedChars.join("")})
        console.log('document', document)
    }

    useEffect(() => {
        updateTextFile(document)
    }, [document])

    //handle update draft settings form
    const handleUpdate = (event) => {
        setCurrentProject(previousValues => ({
            ...previousValues, 
            [event.target.name]: event.target.value
        }))
        
    }

    const saveSettings = () => {
        updateProject()
        setShowModal(false)
    }

    //hide/show modal
    const handleCloseModal = () => setShowModal(false)
    const handleShowModal = () => {
        pause() 
        // setShowModal(true)
        window.removeEventListener("keydown", handleKeyDown, true)
    }
    

    return (
        <div className="body-container editor-container p-5">
            {newDraft ?
                <NewDraftForm setNewDraft={setNewDraft}  />
                : 
                <>
                    <div className="d-flex justify-content-between align-items-center">
                        <button onClick={handleShowModal}>Draft Settings</button>
                        <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Draft Settings</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="d-flex flex-column">
                                <label htmlFor="title">Title:</label>
                                <input value={newProject.title} onChange={handleUpdate} type="text" name="title" autoFocus required/>
                                <label htmlFor="timeFrame">Seconds Editable:</label>
                                <input value={newProject.timeFrame} onChange={handleUpdate} type="number" name="timeFrame" required/>
                                <label htmlFor="maxCharacters">Maximum Visible Characters:</label>
                                <input value={newProject.maxCharacters} onChange={handleUpdate} type="number" name="maxCharacters" required/>
                                <label htmlFor="trusteeName">Name:</label>
                                <input value={newProject.trusteeName} onChange={handleUpdate} type="text" name="trusteeName" required/>
                                <label htmlFor="trusteeEmail">Email:</label>
                                <input value={newProject.trusteeEmail} onChange={handleUpdate} type="email" name="trusteeEmail" required/>
                            </Modal.Body>
                            <Modal.Footer>
                                <div className="btn btn-secondary" onClick={handleCloseModal}>
                                    Close
                                </div>
                                <div className="btn btn-primary" onClick={saveSettings}>
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
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <span style={{display: 'flex'}}>
                                    {visible && visible.map((item, index) => {
                                        return <div style={item.isLocked ? {color: 'red'} : null}>{item.key === " "  ? <>&nbsp;</> : item.key === 'Enter' ? `\n` : item.key}</div>
                                    })}
                                </span>
                                <span className="flashing">|</span>
                            </div>
                    </div>
                </>
            }
        </div>
    )
}
