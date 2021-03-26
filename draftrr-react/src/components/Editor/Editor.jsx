import { useState, useEffect, useRef } from "react"

import "./Editor.scss"

export const Editor = () => {
    const [value, setValue] = useState("")
    const [letters, setLetters ] = useState([])
    const [charLimit, setCharLimit] = useState(3)
    
    useEffect(()=> {
        let newValue
        if (value.length > 0) {
        newValue = value.split('')
        setLetters(newValue)
        }
    }, [value])
    
    useEffect(()=> {
        if (letters.length > charLimit) {
        const newLetters = letters
        newLetters.shift()
        setLetters(newLetters)
        setValue(newLetters.join(""))
        }
    }, [letters])

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, [inputRef])

    return (
        <div className="body-container editor-container p-5">
            <div className="d-flex justify-content-between align-items-end">
                <button>Draft Settings</button>
                <div className="d-flex flex-column align-items-center">
                    <label htmlFor="draftTitle">Draft Title</label>
                    <input id="draftTitle" type="text"/>
                </div>
                <div>
                    <button className="mr-2">Save For Later</button>
                    <button>Submit</button>
                </div>
            </div>
            <div name="mainTextBox" id="mainTextBox" dangerouslySetInnerHTML={value.value} onChange={(e)=>setValue(e.target.value)} ref={inputRef} contentEditable="true">
                {/* <span id="locked"></span> */}
            </div>
            <textarea value={value} onChange={(e)=>setValue(e.target.value)}>
                <span></span>
            </textarea>
        </div>
    )
}
