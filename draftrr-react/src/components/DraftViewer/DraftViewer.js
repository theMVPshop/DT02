import React, {useEffect, useState, useContext} from 'react'
import {useParams, useRouteMatch} from "react-router-dom";
import Draft from './Draft'
import {PDFViewer, PDFDownloadLink} from '@react-pdf/renderer'
import { DraftrrContext } from '../../context/DraftrrContext'
import {Spinner} from 'react-bootstrap'
import axios from 'axios'

export default function DraftViewer() {

    const [text, setText] = useState('')
    const [locked, setLocked] = useState(true)
    const [loaded, setLoaded] = useState(false)

    const {currentUser, currentProject, setCurrentProject, getDraft, document, getProject} = useContext(DraftrrContext)

    const { idProjects, textID } = useParams()

    // const name = currentUser.displayName

    

    useEffect(()=> {


        axios.get(`https://q6ik9h220m.execute-api.us-east-2.amazonaws.com/latest//text/${textID}`)
            .then(res => {
                console.log('getting project text', res.data.text)
                setText(res.data.text)
                setLoaded(true)
            });

        axios.get(`https://q6ik9h220m.execute-api.us-east-2.amazonaws.com/latest//projects/${idProjects}`)
            .then(res => {
                console.log('getting project', res.data[0])
                if(res.data[0].Locked === 0) {
                    setLocked(false)
                }
                setCurrentProject(res.data[0])
            })
    },[])

    const handleUnlock = () => {
        
        
        axios.put(`https://q6ik9h220m.execute-api.us-east-2.amazonaws.com/latest//projects/unlock/${idProjects}`, {locked: 0})
            .then(res => {
                console.log('unlocking project', res)
                setLocked(false)
            })
    }


    
    
    if(loaded) {
        return (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '50px', marginBottom: '50px'}}>
                {!currentUser && locked ? <button  className="btn btn-primary rounded-6 mb-5" onClick={handleUnlock}>Unlock Project</button> : null}
                <PDFViewer width="60%" height="1200" className="app" >
                                <Draft text={text} title={currentProject.Title} name={currentProject.Username} />
                </PDFViewer>
            </div>
        )
    } else { 
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px'}}>
                <Spinner animation="border" color="primary"/>
            </div>
        )   
    }
    
}
