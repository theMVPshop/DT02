import React, {useContext, useState} from 'react'
import { Link } from "react-router-dom"
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import { DraftrrContext } from '../../context/DraftrrContext'
import {UpdatePassword} from './UpdatePassword'
import {UpdateEmail} from './UpdateEmail'
import {UpdateUsername} from './UpdateUsername'

export const UserSettingsModal = () => {
    const {settingsOpen, setSettingsOpen} = useContext(DraftrrContext)
    const [isSetting, setIsSetting] = useState(false)
    const [setting, setSetting] = useState({
        updatePassword: false,
        updateEmail: false,
        updateUsername: false
    })

    const handleClose = () => {
        setIsSetting(false)
        settingsOpen && setSettingsOpen(false)
    }

    const openSetting = (event) => {
        setIsSetting(true)
        setSetting({ ...setting, [event.target.name]: true })
    }

    const handleBack = () => {
        setIsSetting(false)
        setSetting({
            updatePassword: false,
            updateEmail: false,
            updateUsername: false
        })
    }

  return (
    <Modal show={settingsOpen}>
      <Modal.Header>
        <h3>Settings</h3>
        <div>
            <button type="button" className="close" aria-label="Close" onClick={handleClose}>
                <span aria-hidden="true">&times;</span>
            </button>
            {isSetting &&
                <button type="button" className="close" aria-label="Close" onClick={handleBack}>
                    <span aria-hidden="true">{"<"}</span>
                </button>}
        </div>
      </Modal.Header>
      {isSetting ?
        setting.updatePassword && <Modal.Body> <UpdatePassword /> </Modal.Body> ||
        setting.updateEmail && <Modal.Body> <UpdateEmail /> </Modal.Body> ||
        setting.updateUsername && <Modal.Body> <UpdateUsername /> </Modal.Body> 
        :
        <Modal.Body>
            <div style={{display: "flex", flexDirection: "column"}}>
                <Link className="btn btn-primary rounded-6 mb-2" name="updatePassword" onClick={openSetting}>
                    Update Password
                </Link>
                <Link className="btn btn-primary rounded-6 mb-2" name="updateEmail" onClick={openSetting}>
                    Update Email
                </Link>
                <Link className="btn btn-primary rounded-6 mb-1" name="updateUsername" onClick={openSetting}>
                    Update Username
                </Link>
            </ div>
        </Modal.Body>}
    </Modal>
  )
}