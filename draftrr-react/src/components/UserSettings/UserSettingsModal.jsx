import React, {useContext, useState} from 'react'
import { Link } from "react-router-dom"
import Modal from "react-bootstrap/Modal";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

import { DraftrrContext } from '../../context/DraftrrContext'
import {UpdatePassword} from './UpdatePassword'
import {UpdateEmail} from './UpdateEmail'
import {UpdateUsername} from './UpdateUsername'
import {DeleteProfile} from './DeleteProfile'

export const UserSettingsModal = () => {
    const {settingsOpen, setSettingsOpen, isSetting, setIsSetting} = useContext(DraftrrContext)
    const [setting, setSetting] = useState({
        updatePassword: false,
        updateEmail: false,
        updateUsername: false,
        deleteProfile: false
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
            updateUsername: false,
            deleteProfile: false
        })
    }

  return (
    <Modal show={settingsOpen} onHide={handleClose}>
      <Modal.Header>
        <h3>Settings</h3>
        <div>
            <button type="button" className="close" aria-label="Close" onClick={handleClose}>
                <span aria-hidden="true">&times;</span>
            </button>
            {isSetting &&
                <button type="button" className="close" aria-label="Close" onClick={handleBack}>
                    <span aria-hidden="true">{<FaArrowAltCircleLeft color="#5895B2"/>}</span>
                </button>}
        </div>
      </Modal.Header>
      {isSetting ?
        setting.updatePassword && <Modal.Body> <UpdatePassword /> </Modal.Body> ||
        setting.updateEmail && <Modal.Body> <UpdateEmail /> </Modal.Body> ||
        setting.updateUsername && <Modal.Body> <UpdateUsername /> </Modal.Body> ||
        setting.deleteProfile && <Modal.Body> <DeleteProfile /> </Modal.Body>
        :
        <Modal.Body>
            <div className="d-flex flex-column">
                <button className="btn btn-primary rounded-6 mb-2" name="updatePassword" onClick={openSetting}>
                    Update Password
                </button>
                <button className="btn btn-primary rounded-6 mb-2" name="updateEmail" onClick={openSetting}>
                    Update Email
                </button>
                <button className="btn btn-primary rounded-6 mb-1" name="updateUsername" onClick={openSetting}>
                    Update Username
                </button>
                <button className="btn btn-secondary rounded-6 mb-1" name="deleteProfile" onClick={openSetting}>
                    Delete Profile
                </button>
            </ div>
        </Modal.Body>}
    </Modal>
  )
}