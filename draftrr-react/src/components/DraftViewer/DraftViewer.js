import React, {useEffect, useState, useContext} from 'react'
import {useParams} from "react-router-dom";
import Draft from './Draft'
import {PDFViewer, PDFDownloadLink} from '@react-pdf/renderer'
import { DraftrrContext } from '../../context/DraftrrContext'
import {Spinner} from 'react-bootstrap'
import axios from 'axios'

export default function DraftViewer() {

    const [text, setText] = useState('')

    const {currentProject, setCurrentProject, getDraft, document, getProject} = useContext(DraftrrContext)

    const {id} = useParams()

    useEffect(()=> {
        axios.get(`http://localhost:4000/text/${id}`)
            .then(res => {
                console.log('getting project', res.data.text)
                setText(res.data.text)
            })
    },[])
    
    
    if(text) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px'}}>
                <PDFViewer width="60%" height="700" className="app" >
                                <Draft   text={text}/>
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
