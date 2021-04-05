import React, {useEffect, useState, useContext} from 'react'
import Draft from './Draft'
import {PDFViewer, PDFDownloadLink} from '@react-pdf/renderer'
import { DraftrrContext } from '../../context/DraftrrContext'

export default function DraftViewer() {

    const [text, setText] = useState('')

    const {currentProject, setCurrentProject, getDraft, document} = useContext(DraftrrContext)

    useEffect(() => {
        getDraft(currentProject.Text_ID)
        
    }, [])


    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px'}}>
            <PDFViewer width="60%" height="700" className="app" >
                            <Draft   text={document.text}/>
            </PDFViewer>
        </div>
            
        
    )
}
