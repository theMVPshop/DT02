import { useState, useEffect, useRef, useContext } from "react"
import { DraftrrContext } from "../../context/DraftrrContext"

import { Form } from "./Form"

import "./Editor.scss"

export const Editor = () => {
    const [ newDraft, setNewDraft ] = useState(false)


    const [ value, setValue ] = useState([])
    const [ editable, setEditable ] = useState([])
    const [ locked, setLocked ] = useState([])
    const [ time, setTime ] = useState(5)


    const [ letters, setLetters ] = useState([])
    const [ charLimit, setCharLimit ] = useState(3)
    // number of seconds before the text


    const { createProject, createTextFile, currentUser, newProject, setNewProject, } = useContext(DraftrrContext)

    // window.addEventListener("keydown", handleKeyDown)

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        handleTimeframe()
    }, [])

    // useEffect(() => {
    //     console.log('editable is being updated', editable)
    // }, [editable])

    let current = editable

    const handleKeyDown = (e) => {
        // console.log(current)

        const keycode = e.charCode || e.keyCode
        
        // stop certain keys from being pressed.
        if (keycode  > 36 && keycode < 41 ) { 
            //Enter key's keycode
            return false
        }
        
        // 'backspace key deletes last char'
        if (keycode == 8) {
            current.pop()
            // setValue(current)
            setEditable(current)
            // update()
            // return false
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
                            id: e.key + Date.now() + Math.floor(Math.random() * 1000),
                            key: e.key,
                            timestamp: Date.now()
            }
            current.push(keyValue)
            console.log('current', current)
            // setValue(current)
            setEditable(current)
            
            // update()
            // return false
        }
        if ( e.which == 13 ) {
            e.preventDefault()
        }
        console.log('editable', editable)
    }

    
    const handleTimeframe = () => {
        setInterval(function(){ 
            let newEditable = editable
            let newLocked = locked
            
            
            console.log('TICKING editable', editable)
            newEditable.forEach((item, index) => {
                // newEditable = editable
                // newLocked = locked
                console.log('item', item)
                if (item.timestamp < Date.now() - (time * 1000)) {
                    
                    
                    let removed = newEditable.splice(index, 1)
                    newLocked.push(removed)
                    // newEditable.splice(index, 1)
                    console.log('removed', newEditable)
                    setEditable([...newEditable])
                    setLocked([...newLocked])
                    console.log('locked', locked)
                    
                    
                } 
                
                
            })
    
        }, 500);

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
                            <button className="mr-2">Save For Later</button>
                            <button className="btn btn-primary rounded-6">Submit</button>
                        </div>
                    </div>
                    <div id="mainTextBox">
                        {/* <span>{locked}</span> */}
                        {/* <span>{editable}</span> */}
                        {/* <span className="flashing">|</span> */}
                        {/* {value} */}
                    </div>



                    {/* <textarea value={value} onChange={(e)=>setValue(e.target.value)}>
                        <span></span>
                    </textarea> */}'
                    <ul>
                        <p>editable</p>
                        {editable[0] && editable.map((item) => {
                        console.log('mapping editable')
                        return <li>{item.key}</li>})}
                    {/* <button onClick={()=>console.log(current)}>current</button> */}



                    </ul>
                    
                </>
            }
        </div>
    )
}
