import { useState, useEffect, useRef, useContext } from "react"
import { DraftrrContext } from "../../context/DraftrrContext"

import { Form } from "./Form"

import "./Editor.scss"

let interval

export const Editor = () => {
    const [ newDraft, setNewDraft ] = useState(false)
    const [ editable, setEditable ] = useState([])
    const [ locked, setLocked ] = useState([])
    const [ time, setTime ] = useState(5)
    const [maxCharacters, setMaxCharacters] = useState(30)
    const [visible, setVisible] = useState([])

    const [ letters, setLetters ] = useState([])
    const [ charLimit, setCharLimit ] = useState(3)

    const { document, setDocument, createProject, createTextFile, currentUser, newProject, setNewProject, } = useContext(DraftrrContext)

    useEffect(() => {
        initialize()
    }, [])


    const initialize = () => {  window.addEventListener("keydown", handleKeyDown); interval = setInterval(checkTimeStamps, 100)} //initial functions for when the session begins

    const handleSave = () => {combineDoc()} //save progress and keep working

    const handleSaveAndExit = () => {clearInterval(interval); handleSave()} // clear interval, save document and exit session

    const handleSubmit = () => {handleSaveAndExit()} //clear interval, save document and upload to DB

    const autoSave = () => {} //possible interval for autosaving progress, still thinking on this one

    const handleKeyDown = (e) => {
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
            keycode !== 20 &&
            keycode !== 13
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
                
                if(index < maxCharacters) {
                    newArray.push(item)
                }
    
            })
        newArray.reverse()
        setVisible([...newArray])


        console.log('newArray', newArray)
        
        
        
    }

    
    const checkTimeStamps = () => {
        let newEditable = editable
        let newLocked = locked
        newEditable.forEach((item, index) => {
            if (item.timestamp < Date.now() - (time * 1000)) {
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
        
        const mappedChars = final.map((char) => {
            return char.key
        })
        setDocument(mappedChars.join(""))
    }

    


    return (
        <div className="body-container editor-container p-5">
            {newDraft ?
                <Form setNewDraft={setNewDraft} />
                : 
                <>
                    <div className="d-flex justify-content-between align-items-end">
                        <button>Draft Settings</button>
                        <div className="d-flex flex-column align-items-center">
                            <label htmlFor="draftTitle">Draft Title</label>
                            <input value={newProject.title} id="draftTitle" type="text"/>
                        </div>
                        <div>
                            <button onClick={handleSave} className="mr-2">Save Progress</button>
                            <button onClick={handleSaveAndExit} className="mr-2">Save For Later</button>
                            <button onClick={handleSubmit} className="btn btn-primary rounded-6">Submit</button>
                        </div>
                    </div>
                    {/* <div id="mainTextBox">
                        <span>
                            {locked && locked.map((item) => {
                            return <>{item.key}</>})}
                        </span>
                        <span>
                            {editable && editable.map((item) => {
                            return <>{item.key}</>})}
                        </span>
                        <span className="flashing">|</span>
                    </div> */}

                    <div id="mainTextBox">
                        <span>
                            
                        </span>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <span style={{display: 'flex'}}>
                                {visible && visible.map((item, index) => {
                                    
                                        return <div style={item.isLocked ? {color: 'red'} : null}>{item.key}</div>
                                    
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
