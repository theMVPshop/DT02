import { useState, useEffect, useRef, useContext } from "react"
import { DraftrrContext } from "../../context/DraftrrContext"
import {useParams, useRouteMatch, useHistory} from "react-router-dom";
import { SettingsModal } from "./SettingsModal"
import axios from 'axios'

import "./Editor.scss"
import userEvent from "@testing-library/user-event"

let interval

export const Editor = () => {
    const [ editable, setEditable ] = useState([])
    const [ locked, setLocked ] = useState([])
    const [ visible, setVisible ] = useState([])
    const [ showModal, setShowModal ] = useState(false)

    const { document, setDocument, createProject, createTextFile, currentUser, updateTextFile, currentProject, setCurrentProject, updateProject} = useContext(DraftrrContext)

    const { idProjects, textID } = useParams()

    const history = useHistory()

    useEffect(()=> {

        axios.get(`http://localhost:4000/text/${textID}`)
            .then(res => {
                console.log('getting project text', res.data.text)
                setDocument(res.data.text)
            });

        axios.get(`http://localhost:4000/projects/${idProjects}`)
            .then(res => {
                console.log('getting project', res.data[0])
                setCurrentProject(res.data[0])
            })
    },[])

    useEffect(() => {
        if(!showModal) {
            
            window.addEventListener("keydown", handleKeyDown) 
            interval = setInterval(checkTimeStamps, 50)
            return () => {
                window.removeEventListener("keydown", handleKeyDown)
            }

        }
    }, [showModal])


    useEffect(() => {
        if (showModal) {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [showModal])


    const pause = () => {
        clearInterval(interval); 
        
        console.log('pausing draft')
        console.log('window', window)
        window.removeEventListener("keydown", handleKeyDown)
    }
    
    //save progress and keep working
    const handleSave = () => combineDoc() 
    
    // clear interval, save document and exit session
    const handleSaveAndExit = () => {
        clearInterval(interval); 
        handleSave()
        history.push('/dashboard')
    } 
    
    //clear interval, save document and upload to DB
    const handleSubmit = () => handleSaveAndExit()
    
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
        // if ( e.which == 13 ) {
        //     e.preventDefault()
        // }
    }

    const checkMaxCharacters = () => {
        let newState = locked.concat(editable).reverse()
        let newArray = []

            newState.forEach((item, index) => {
                
                if(index < currentProject.ProjectMaxCharacters) {
                    newArray.push(item)
                }
    
            })
        newArray.reverse()
        setVisible([...newArray])

        
    }
    
    const checkTimeStamps = () => {
        let newEditable = editable
        let newLocked = locked
        newEditable.forEach((item, index) => {
            if (item.timestamp < Date.now() - (currentProject.ProjectTimeframe * 1000)) {
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
        const mappedChars = final.map((char) => char.key).join("")
        clearInterval(interval)

        if(locked !== [] && editable !== []) {
            updateTextFile(document ? {text: document + ' ' + mappedChars} : {text: mappedChars})
        
            
            
        }
        
        
    }

    useEffect(() => {
        console.log('document', document)
        
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
            
                <>
                    <div className="d-flex justify-content-between align-items-center">
                        <button onClick={handleShowModal}>Draft Settings</button>
                        <SettingsModal handleUpdate={handleUpdate} saveSettings={saveSettings} />
                        {/* <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Draft Settings</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="d-flex flex-column">
                                <label htmlFor="title">Title:</label>
                                <input value={currentProject.title} onChange={handleUpdate} type="text" name="title" autoFocus required/>
                                <label htmlFor="timeFrame">Seconds Editable:</label>
                                <input value={currentProject.timeFrame} onChange={handleUpdate} type="number" name="timeFrame" required/>
                                <label htmlFor="maxCharacters">Maximum Visible Characters:</label>
                                <input value={currentProject.maxCharacters} onChange={handleUpdate} type="number" name="maxCharacters" required/>
                                <label htmlFor="trusteeName">Name:</label>
                                <input value={currentProject.trusteeName} onChange={handleUpdate} type="text" name="trusteeName" required/>
                                <label htmlFor="trusteeEmail">Email:</label>
                                <input value={currentProject.trusteeEmail} onChange={handleUpdate} type="email" name="trusteeEmail" required/>
                            </Modal.Body>
                            <Modal.Footer>
                                <div className="btn btn-secondary" onClick={handleCloseModal}>
                                    Close
                                </div>
                                <div className="btn btn-primary" onClick={saveSettings}>
                                    Save Changes
                                </div>
                            </Modal.Footer>
                        </Modal>                */}
                        <div className="d-flex flex-column align-items-center">
                            <div className="font-weight-bold">{currentProject.title}</div>
                        </div>
                        <div>
                            
                            <button onClick={handleSaveAndExit} className="mr-2">Save For Later</button>
                            <button onClick={handleSubmit} className="btn btn-primary rounded-6">Submit</button>
                        </div>
                    </div>
                    <div id="mainTextBox">
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <span style={{display: 'flex'}}>
                                    {visible && visible.map((item, index) => {
                                        return <div style={item.isLocked ? {color: 'red'} : null}>{item.key === " "  ? <>&nbsp;</> : item.key === 'Enter' ? <><br/></> : item.key}</div>
                                    })}
                                </span>
                                <span className="flashing">|</span>
                            </div>
                    </div>
                </>
            
        </div>
    )
}
