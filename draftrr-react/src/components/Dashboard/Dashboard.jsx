import { useState, useContext, useEffect } from "react"
import { DraftrrContext } from '../../context/DraftrrContext'
import { Link, useHistory } from "react-router-dom"


import axios from "axios"
import Modal from "react-bootstrap/Modal"
import { ListGroup, Button, OverlayTrigger, Tooltip, Dropdown, Spinner } from 'react-bootstrap'
import { FaUserCog, FaCog, FaFileDownload, FaPlay, FaTrashAlt, FaLock, FaUnlock, FaPaperPlane, FaEye } from "react-icons/fa";

import { UserSettingsModal } from '../UserSettings/UserSettingsModal'
import { SettingsModal } from '../Editor/SettingsModal'

import "./Dashboard.scss"

export const Dashboard = () => {
    const [loadingDrafts, setLoadingDrafts] = useState(true)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteDraft, setDeleteDraft] = useState({draft: {Title: ''}})
    const [showModal, setShowModal] = useState(false)

    const history = useHistory();

    const {currentUser, projects, setProjects, setCurrentProject, deleteProject, setSettingsOpen, updateProject} = useContext(DraftrrContext)

    const uid = currentUser.uid
    const name = currentUser.displayName

    useEffect(()=>{
        setCurrentProject({
            Title: '',
            ProjectTimeframe: 10,
            ProjectMaxCharacters: 200,
            ProjectFont: 'helvetica',
            TrusteeName: '',
            TrusteeEmail: '',
            Text_ID: '',
            Users_ID: '',
            Locked: true,
            Submitted: false})
    },[])
    

    const handleGetProjects = () => {
        axios.get(`http://localhost:4000/user/projects/${uid}`).then( res => {
            setProjects(res.data)
            setLoadingDrafts(false)
        })
        console.log('projects', projects)
    }

    const handleSelect = (payload) => {
        if (payload.Locked) {
            setCurrentProject(payload)
            history.push(`/editor/${payload.idProjects}/${payload.Text_ID}`)
        }
    }

    //SETTINGS MODAL FUNCTIONS////////////////////////////////
    const handleShowModal = (payload) => {
        setCurrentProject(payload)
        setShowModal(true)
    }

    const saveSettings = () => {
        updateProject()
        setShowModal(false)
        setCurrentProject({Title: '',
                            ProjectTimeframe: 10,
                            ProjectMaxCharacters: 200,
                            ProjectFont: 'helvetica',
                            TrusteeName: '',
                            TrusteeEmail: '',
                            Text_ID: '',
                            Users_ID: '',
                            Locked: true,
                            Submitted: false})

        handleGetProjects()
        
    }

    const handleCloseModal = () => setShowModal(false)

    const handleUpdate = (event) => {
        setCurrentProject(previousValues => ({
            ...previousValues, 
            [event.target.name]: event.target.value
        }))
    }
    ///////////////////////////////////////////////////////////

    const handleView = (payload) => {
        setCurrentProject(payload)
        history.push(`/draftviewer/${payload.idProjects}/${payload.Text_ID}`)
    }
    
    const handleDelete = (project, idx) => {
        deleteProject(project.idProjects, project.Text_ID, idx)
        setShowDeleteModal(false)
    }
    
    const handleSettings = () => {
        setSettingsOpen(true)
    }
    
    const handleClose = () => setShowDeleteModal(false);

    const handleSubmit = (draft) => {
        axios.put(`http://localhost:4000/projects/submit/${draft.idProjects}`, {submitted: 1})
            .then(res => {
                console.log('submitting project', res)
            })
        
        const mailOptions = {
            from: 'rockman4447@gmail.com',
            to: draft.TrusteeEmail,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!',
            html: `<p>Click <a href="http://localhost:3000/draftviewer/${draft.idProjects}/${draft.Text_ID}/">here</a> to view the Draft!</p>`
        }

        console.log('sending email to', mailOptions)
        axios.post(`http://localhost:4000/mailer/send`, mailOptions).then( res => {
            console.log('email sent', res)
        })
    }

    const handleShow = (draft, idx) => {
        setDeleteDraft(
            {
                draft,
                idx
            }
        )
        setShowDeleteModal(true)
    };

    const LockedIcon = (props) => {
        if (!props.status) {
            return <FaUnlock style={{ margin: '0 15px' }} size='1.5em' title="Unlocked Draft" color='silver' />
        } else {
            return <FaLock style={{ margin: '0 15px' }} size='1.5em' title="Unlocked Draft" color='#5895B2' />
        }
    }

    const DeleteModal = () => {
        if (deleteDraft) {
            return (
                <Modal show={showDeleteModal} onHide={handleClose}>
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete {deleteDraft.draft.Title}?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to delete this draft? This cannot be undone.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>Cancel</Button>
                            <Button variant="danger" onClick={()=> handleDelete(deleteDraft.draft, deleteDraft.idx)}>Delete</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            )
        }
    }

    const ViewDownloadOption = (props) => {
        const draft = props.draft;
        const status = props.draft.Locked
        if (!status) {
            return (
                <OverlayTrigger
                    key="Download Draft"
                    placement="top"
                    overlay={
                        <Tooltip id={"tooltop-download"}>
                        View/Download {draft.Title}
                        </Tooltip>
                    }
                >
                    <div>
                        <FaFileDownload style={{ margin: '0 15px' }} size='1.5em' title="Download Draft" color='#5895B2'/>
                        View/Download
                    </div>
                </OverlayTrigger>
            )
        } else {
            return (
                <OverlayTrigger
                    key="View Draft"
                    placement="top"
                    overlay={
                        <Tooltip id={"tooltop-download"}>
                        View {draft.Title}
                        </Tooltip>
                    }
                >
                    <div>
                        <FaEye style={{ margin: '0 15px' }} size='1.5em' title="Download Draft" color='#5895B2'/>
                        View
                    </div>
                </OverlayTrigger>
            )
        }
    }
    
    const LoadingDashboard = () => {
        if (loadingDrafts) {
            return (
                <div className="container body-container w-50 d-flex flex-column align-items-center ">
                    <Spinner animation="border" color="primary" />
                    <h5>Loading Drafts</h5>
                </div>
            )
        } else if (projects.length === 0) {
            return (
                <div className="container body-container w-80 d-flex flex-column align-items-center">
                    <h3 color="primary">Looks like you don't have any drafts.</h3>
                    <h5 color="primary">Click "New Draft" to get one started.</h5>
                </div>
            )
        } 
        else {
            return (
                <ListGroup className="shadow p-3 mb-5 bg-white rounded" style={{minWidth: '400px'}} >
                    {projects && projects.map((draft, idx) => {
                        return (
                            <div className="d-flex align-items-center justify-content-end">
                                <LockedIcon status={draft.Locked} id={draft.idProjects} />
                                <ListGroup.Item key={idx}>
                                    {draft.Title}
                                </ListGroup.Item>
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="dropdown-options">
                                        Options
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu >
                                        <Dropdown.Item onClick={()=> draft.Submitted !== 1 ? handleSelect(draft) : null}>
                                            <OverlayTrigger
                                                key="Resume Draft"
                                                placement="top"
                                                overlay={
                                                    <Tooltip id={"tooltop-resume"}>
                                                    {draft.Submitted ? `Draft Has Already Been Submitted` : `Resume ${draft.Title}`}
                                                    </Tooltip>
                                                }
                                            >
                                                <div>
                                                    <FaPlay style={{ margin: '0 15px' }} size='1.5em' title="Resume Draft" color={draft.Submitted ? 'silver' : '#5895B2'} />
                                                    Resume
                                                </div>
                                            </OverlayTrigger>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={()=> handleView(draft)}>
                                            <ViewDownloadOption draft={draft} />
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={()=> draft.Locked !== 0 ? handleSubmit(draft) : null}>
                                            <OverlayTrigger
                                                key="Submit Draft"
                                                placement="top"
                                                overlay={
                                                    <Tooltip id={"tooltop-submit"}>
                                                    {draft.Locked === 0 ? "Draft Already Unlocked" : draft.Submitted ? `Resend ${draft.Title} to trustee` : `Submit ${draft.Title} to trustee`}
                                                    </Tooltip>
                                                }
                                            >
                                                <div>
                                                    <FaPaperPlane style={{ margin: '0 15px' }} size='1.5em' title="Submit Draft" color={!draft.Locked ? 'silver' : '#5895B2'}/>
                                                    { draft.Locked === 0 ? "Submit" : draft.Submitted ? "Resend Email" : "Submit"}
                                                </div>
                                            </OverlayTrigger>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={()=> draft.Submitted !== 1 ? handleShowModal(draft) : null}>
                                            <OverlayTrigger
                                                key="Draft Settings"
                                                placement="top"
                                                overlay={
                                                    <Tooltip id={"tooltop-settings"}>
                                                    {draft.Title} Settings
                                                    </Tooltip>
                                                }
                                            >
                                                <div>
                                                    <FaCog style={{ margin: '0 15px' }} size='1.5em' title="Draft Settings" color={draft.Submitted ? 'silver' : '#5895B2'}/>
                                                    Settings
                                                </div>
                                            </OverlayTrigger>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleShow(draft, idx)}>
                                            <OverlayTrigger
                                                key="Delete Draft"
                                                placement="top"
                                                overlay={
                                                    <Tooltip id={"tooltop-delete"}>
                                                    Delete {draft.Title}
                                                    </Tooltip>
                                                }
                                            >
                                                <div>
                                                    <FaTrashAlt style={{ margin: '0 15px' }} size='1.5em' title="Delete Draft" color='red'/>
                                                    Delete
                                                </div>
                                            </OverlayTrigger>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </div>
                        )
                    })}
                </ListGroup>
            )
        }
    }

    useEffect(() => {
        handleGetProjects()
    }, [])

    return (
        <div className="container body-container w-50 d-flex flex-column align-items-center ">
            <SettingsModal handleUpdate={handleUpdate} saveSettings={saveSettings} showModal={showModal} handleCloseModal={handleCloseModal}/>
            <h1 className=" text-primary">Dashboard</h1>
            <h3 className=" my-3">{`Hello, ${name}`}</h3>
            <h2 className="mb-4 text-primary">My Drafts</h2>
            <div className="container d-flex w-100 p-0 justify-content-between align-items-end mb-4" >
                <Link to="/newdraft">
                    <Button className="btn btn-primary rounded-6 btn-lg">New Draft</Button>
                </Link>
                
                <OverlayTrigger
                    key="User Settings"
                    placement="top"
                    overlay={
                        <Tooltip id={"tooltop-userSettings"}>
                        User Settings
                        </Tooltip>
                    }
                >
                    <div className="btn btn-primary rounded-6 btn-lg" onClick={handleSettings}>
                        <FaUserCog size='1.5em' />
                    </div>
                </OverlayTrigger>
            </div>
                <LoadingDashboard />
                <UserSettingsModal />
                <DeleteModal />
        </div>
    )
}
