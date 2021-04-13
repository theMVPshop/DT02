import { useState, useEffect, useRef, useContext } from "react"
import { DraftrrContext } from "../../context/DraftrrContext"
import {useParams, useHistory} from "react-router-dom"

import { SettingsModal } from "./SettingsModal"

import axios from "axios"

import "./Editor.scss"

let interval

export const Editor = () => {
    const [ editable, setEditable ] = useState([])
    const [ locked, setLocked ] = useState([])
    const [ visible, setVisible ] = useState([])
    const [ showModal, setShowModal ] = useState(false)

    const { document, currentUser, setDocument, updateTextFile, currentProject, setCurrentProject, updateProject} = useContext(DraftrrContext)

    const { idProjects, textID } = useParams()

    const history = useHistory()

    useEffect(()=> {
        axios.get(`https://q6ik9h220m.execute-api.us-east-2.amazonaws.com/latest/text/${textID}`)
            .then(res => {
                setDocument(res.data.text)
            });

        axios.get(`https://q6ik9h220m.execute-api.us-east-2.amazonaws.com/latest/projects/${idProjects}`)
            .then(res => {
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
        window.removeEventListener("keydown", handleKeyDown)
    }
    
    //save progress and keep working
    const handleSave = () => combineDoc() 
    
    // clear interval, save document and exit session
    const handleSaveAndExit = () => {
        clearInterval(interval)
        handleSave()
        history.push('/dashboard')
    } 
    
    //clear interval, save document and upload to DB
    const handleSubmit = () => {

        console.log('submitting project!')
        axios.put(`https://q6ik9h220m.execute-api.us-east-2.amazonaws.com/latest/projects/submit/${currentProject.idProjects}`, {submitted: 1})
            .then(res => {
                console.log('project submitted!', res)
            })
                                     
        
        const mailOptions = {
            from: 'rockman4447@gmail.com',
            to: currentProject.TrusteeEmail,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!',
            html: `<p>Click <a href="https://www.draftrr.com/draftviewer/${currentProject.idProjects}/${currentProject.Text_ID}/${currentUser.uid}">here</a> to view the Draft!</p>`
        }
        console.log('sending email to', mailOptions)
        axios.post(`https://q6ik9h220m.execute-api.us-east-2.amazonaws.com/latest/mailer/send`, mailOptions).then( res => {
            console.log('email sent', res)
            
        })
        handleSaveAndExit() 
}
    
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
        if (locked !== [] && editable !== []) {
            updateTextFile(document ? {text: document + ' ' + mappedChars} : {text: mappedChars})
        }
    }

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
        setShowModal(true)
        window.removeEventListener("keydown", handleKeyDown, true)
    }
    
    return (
        <div className="body-container editor-container p-5">
            <div className="d-flex justify-content-between align-items-center">
                <button onClick={handleShowModal}>Draft Settings</button>
                <SettingsModal handleUpdate={handleUpdate} saveSettings={saveSettings} showModal={showModal} handleCloseModal={handleCloseModal}/>
                <div className="d-flex flex-column align-items-center">
                    <div className="font-weight-bold">{currentProject.title}</div>
                </div>
                <div>
                    <button onClick={handleSaveAndExit} className="mr-2">Save For Later</button>
                    <button onClick={handleSubmit} className="btn btn-primary rounded-6">Submit</button>
                </div>
            </div>
            <input style={{border: "none", color: "transparent", width: "1px", caretColor: "transparent"}} type="text" autoFocus/>
            <div id="mainTextBox">
                <div className="d-flex align-items-center flex-wrap">
                    {visible && visible.map((item, index) => {
                        return <span key={index} style={item.isLocked ? {color: 'red'} : null}>{item.key === " "  ? <>&nbsp;</> : item.key === 'Enter' ? <><br/></> : item.key}</span>
                    })}
                    <span className="flashing">|</span>
                </div>
            </div>
        </div>
    )
}
