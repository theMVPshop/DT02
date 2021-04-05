import { useState, useContext, useEffect } from "react"
import { DraftrrContext } from '../../context/DraftrrContext'
import Modal from 'react-bootstrap/Modal'
import { ListGroup, Button, OverlayTrigger, Tooltip, Dropdown, Spinner } from 'react-bootstrap'
import { FaUserCog, FaCog, FaFileDownload, FaPlay, FaTrashAlt, FaLock, FaUnlock, FaPaperPlane, FaEye } from "react-icons/fa";
import {UserSettingsModal} from '../UserSettings/UserSettingsModal'
import { Link, useHistory } from "react-router-dom"
import axios from "axios"
import "./Dashboard.scss"


export const Dashboard = () => {
    const [loadingDrafts, setLoadingDrafts] = useState(true);
    const [ textFiles, setTextFiles ] = useState()
    const [ textFilePath, setTextFilePath ] = useState()
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteDraft, setDeleteDraft] = useState({draft: {Title: ''}})

    const history = useHistory();

    const {currentUser, loading, setLoading, projects, setProjects, currentProject, setCurrentProject, deleteProject, setSettingsOpen} = useContext(DraftrrContext)

    const uid = currentUser.uid
    const name = currentUser.displayName

    const handleGetProjects = () => {
        axios.get(`http://localhost:4000/user/projects/${uid}`).then( res => {
            setProjects(res.data)
            setLoadingDrafts(false)
            // console.log('res', res.data)
        })
        console.log('projects', projects)
    }

    const handleGetTextFiles = () => {
        axios.get(`http://localhost:4000/text/${textFilePath}`).then( res => setTextFiles({res}))
        console.log(textFiles)
    }

    const handleSelect = (payload) => {
        // console.log("resume", payload)
        if (payload.Locked) {
            setCurrentProject(payload)
            history.push('/editor')
        }
    }

    const handleView = (payload) => {
        // console.log("resume", payload)
        setCurrentProject(payload)
        history.push('/draftviewer')
    }

    const handleNewClick = () => {
        setCurrentProject()
    }
    
    const handleDelete = (project, idx) => {
        deleteProject(project.idProjects, project.Text_ID, idx)
        setShowDeleteModal(false)
    }

    const handleChangeClick = () => {
        setLoadingDrafts(false)
    }
    
    const handleSettings = () => {
        setSettingsOpen(true)
    }
    
    const handleClose = () => setShowDeleteModal(false);

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
                                        <Dropdown.Item onClick={()=> handleSelect(draft)}>
                                            <OverlayTrigger
                                                key="Resume Draft"
                                                placement="top"
                                                overlay={
                                                    <Tooltip id={"tooltop-resume"}>
                                                    Resume {draft.Title}
                                                    </Tooltip>
                                                }
                                            >
                                                <div>
                                                    <FaPlay style={{ margin: '0 15px' }} size='1.5em' title="Resume Draft" color={!draft.Locked ? 'silver' : '#5895B2'} />
                                                    Resume
                                                </div>
                                            </OverlayTrigger>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={()=> handleView(draft)}>
                                            <ViewDownloadOption draft={draft} />
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <OverlayTrigger
                                                key="Submit Draft"
                                                placement="top"
                                                overlay={
                                                    <Tooltip id={"tooltop-submit"}>
                                                    Submit {draft.Title} to trustee
                                                    </Tooltip>
                                                }
                                            >
                                                <div>
                                                    <FaPaperPlane style={{ margin: '0 15px' }} size='1.5em' title="Submit Draft" color={!draft.Locked ? 'silver' : '#5895B2'}/>
                                                    Submit
                                                </div>
                                            </OverlayTrigger>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
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
                                                    <FaCog style={{ margin: '0 15px' }} size='1.5em' title="Draft Settings" color={!draft.Locked ? 'silver' : '#5895B2'}/>
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

    useEffect(() => {
        console.log('projects', projects)
    }, [projects])

    return (
        <div className="container body-container w-50 d-flex flex-column align-items-center ">
            <h1 className=" text-primary">Dashboard</h1>
            <h3 className=" my-3">{`Hello, ${name}`}</h3>
            {/* <div className="mb-5">
                <button onClick={handleGetTextFiles}>Get Text Files</button>            
                <button onClick={handleChangeClick}>Get Text Files</button>            
            </div> */}
                <h2 className="mb-4 text-primary">My Drafts</h2>
            <div className="container d-flex w-100 p-0 justify-content-between align-items-end mb-4" >

                        <Link to="/editor" onClick={handleNewClick} >
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
