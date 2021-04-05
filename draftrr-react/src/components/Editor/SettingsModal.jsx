import { useContext } from 'react'
import { DraftrrContext } from "../../context/DraftrrContext"

import Modal from "react-bootstrap/Modal"

export const SettingsModal = ({ showModal, handleCloseModal, handleUpdate, saveSettings }) => {
    const { currentProject } = useContext(DraftrrContext)

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Draft Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column">
                <label htmlFor="title">Title:</label>
                <input value={currentProject.title} onChange={handleUpdate} type="text" name="title" autoFocus required/>
                <label htmlFor="timeFrame">Seconds Editable:</label>
                <input value={currentProject.timeFrame} onChange={handleUpdate} type="number" name="timeFrame" required/>
                <label htmlFor="maxCharacters">Maximum Visible Characters:</label>
                <input value={currentProject.maxCharacters} onChange={handleUpdate} type="number" name="maxCharacters" required/>
                <label htmlFor="trusteeName">Name:</label>
                <input value={currentProject.trusteeName} onChange={handleUpdate} type="text" name="trusteeName" required/>
                <label htmlFor="trusteeEmail">Email:</label>
                <input value={currentProject.trusteeEmail} onChange={handleUpdate} type="email" name="trusteeEmail" required/>
            </Modal.Body>
            <Modal.Footer>
                <div className="btn btn-secondary" onClick={handleCloseModal}>
                    Close
                </div>
                <div className="btn btn-primary" onClick={saveSettings}>
                    Save Changes
                </div>
            </Modal.Footer>
        </Modal>
    )
}



