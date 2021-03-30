import { useState, useEffect, useRef } from "react"

import "./Editor.scss"

export const Editor = () => {
    const [value, setValue] = useState([])
    const [locked, setLocked] = useState("")
    const [letters, setLetters ] = useState([])
    const [charLimit, setCharLimit] = useState(3)
    // number of seconds before the text
    const [ time, setTime ] = useState(5)
    
    // useEffect(()=> {
    //     let newValue
    //     if (value.length > 0) {
    //     newValue = value.split('')
    //     setLetters(newValue)
    //     }
    // }, [value])
    
    // useEffect(()=> {
    //     if (letters.length > charLimit) {
    //     const newLetters = letters
    //     newLetters.shift()
    //     setLetters(newLetters)
    //     setValue(newLetters.join(""))
    //     }
    // }, [letters])

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, [inputRef])

    
    let current = [...value]

    const handleKeyDown = (event) => {
        console.log(current)

        let keycode = event.charCode || event.keyCode;
        
        // stop certain keys from being pressed.
        if (keycode  > 36 && keycode < 41 || keycode == 46) { //Enter key's keycode
            return false
        }
        
        // 'backspace key deletes last char'
        if (keycode == 8) {
            current.pop()
            setValue(current)
            // update()
            // return false
        } else if (keycode !== 16 && keycode !== 91 && keycode !== 17 && keycode !== 18 && keycode !== 38 && keycode !== 37 && keycode !== 39 && keycode !== 40 && keycode !== 93 && keycode !== 27 && keycode !== 9 && keycode !== 20 && keycode !== 13) { // add typed key to array
            current.push([event.key, Date.now()])
            setValue(current)
            // update()
            // return false
        }
        if ( event.which == 13 ) {
            event.preventDefault()
        }
    }

    useEffect(() => {
        const newValue = [...value]
        newValue.forEach((item, index) => {
            if (item[1] < Date.now() - (time * 1000)) {
                // $('#mainTextBox span').append(item[0]);
                const newLocked = locked
                const updateLocked = newLocked.concat(item[0])
                setLocked(updateLocked)
    
            } 
            })
    }, [value])


    

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
                    <button className="btn btn-primary rounded-6">Submit</button>
                </div>
            </div>
            <div name="mainTextBox" id="mainTextBox" onKeyDown={handleKeyDown}  ref={inputRef} contentEditable="true">
                <span>{locked}</span>
                {/* {value} */}
            </div>
            <textarea value={value} onChange={(e)=>setValue(e.target.value)}>
                <span></span>
            </textarea>
            <div>{value}</div>
            {/* <button onClick={()=>console.log(current)}>current</button> */}
        </div>
    )
}
