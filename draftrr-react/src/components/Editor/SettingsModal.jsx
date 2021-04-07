import { useContext } from 'react'
import { DraftrrContext } from "../../context/DraftrrContext"

import Modal from "react-bootstrap/Modal"

export const SettingsModal = ({ showModal, setShowModal, handleCloseModal, handleUpdate, saveSettings }) => {
    const { currentProject } = useContext(DraftrrContext)

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Draft Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column">
                <label htmlFor="title">Title:</label>
                <input value={currentProject.Title} onChange={handleUpdate} type="text" name="Title" autoFocus required/>
                
                <label htmlFor="timeFrame">Seconds Editable: <span className="font-weight-normal">{currentProject.ProjectTimeframe}</span></label>
                <input type="range" id="timeFrame" name="ProjectTimeframe" min="1" max="60" value={currentProject.ProjectTimeframe} onChange={handleUpdate}  />
                {/* <input type="range" id="timeFrame" name="timeFrame" value={currentProject.timeFrame} onChange={handleUpdate} /> */}

                <label htmlFor="maxCharacters">Maximum Visible Characters: <span className="font-weight-normal">{currentProject.ProjectMaxCharacters}</span></label>
                <input type="range" id="maxCharacters" name="ProjectMaxCharacters" min="100" max="1000" value={currentProject.ProjectMaxCharacters} onChange={handleUpdate} />
                {/* <input value={currentProject.maxCharacters} onChange={handleUpdate} type="number" name="maxCharacters" required/> */}
                
                <label htmlFor="trusteeName">Name:</label>
                <input value={currentProject.TrusteeName} onChange={handleUpdate} type="text" name="TrusteeName" required/>
                
                <label htmlFor="trusteeEmail">Email:</label>
                <input value={currentProject.TrusteeEmail} onChange={handleUpdate} type="email" name="TrusteeEmail" required/>
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



