import { useState, useContext, useEffect } from "react"
import { DraftrrContext } from '../../context/DraftrrContext'
import { ListGroup, Button, OverlayTrigger, Tooltip, Dropdown, Spinner } from 'react-bootstrap'
import { FaUserCog, FaCog, FaFileDownload, FaPlay, FaTrashAlt, FaLock, FaUnlock, FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom"
import "./Dashboard.scss"

const dummyList = [
    {
        title: "Draft 1",
        completed: true,
        downloadable: false,
        changeSettings: true,
        unlocked: true
    },
    {
        title: "Draft 2",
        completed: false,
        downloadable: true,
        changeSettings: false,
        unlocked: false
    },
    {
        title: "Draft 3",
        completed: false,
        downloadable: true,
        changeSettings: false,
        unlocked: false
    },
    {
        title: "Draft 4",
        completed: true,
        downloadable: false,
        changeSettings: true,
        unlocked: false
    }
]


export const Dashboard2 = () => {
    const [loadingDrafts, setLoadingDrafts] = useState(true);

    const {currentUser, loading, setLoading, projects, setProjects} = useContext(DraftrrContext)

    const uid = currentUser.uid
    const name = currentUser.displayName

    const LockedIcon = (props) => {
        if (props.status) {
            return <FaUnlock style={{ margin: '0 15px' }} size='1.5em' title="Unlocked Draft" color='silver' />
        } else {
            return <FaLock style={{ margin: '0 15px' }} size='1.5em' title="Unlocked Draft" color='#5895B2' />
        }
    }

    const handleChangeClick = () => {
        setLoadingDrafts(false)
    }

    const LoadingDashboard = () => {
        if (loadingDrafts) {
            return (
                <div className="container body-container w-50 d-flex flex-column align-items-center ">
                    <Spinner animation="border" color="primary" />
                    <h5>Loading Drafts</h5>
                </div>
            )
        } else {
            return (
                <ListGroup className="shadow p-3 mb-5 bg-white rounded">
                    {dummyList.map(draft => {
                        return (
                            <div className="d-flex align-items-center justify-content-end">
                                <LockedIcon status={draft.unlocked} />
                                <ListGroup.Item>
                                    {draft.title}
                                </ListGroup.Item>
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="dropdown-options">
                                        Options
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu >
                                        <Dropdown.Item href="#/action-1">
                                            <OverlayTrigger
                                                key="Resume Draft"
                                                placement="top"
                                                overlay={
                                                    <Tooltip id={"tooltop-resume"}>
                                                    Resume {draft.title}
                                                    </Tooltip>
                                                }
                                            >
                                                <div>
                                                    <FaPlay style={{ margin: '0 15px' }} size='1.5em' title="Resume Draft" color={draft.completed ? 'silver' : '#5895B2'} />
                                                    Resume
                                                </div>
                                            </OverlayTrigger>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">
                                            <OverlayTrigger
                                                key="Download Draft"
                                                placement="top"
                                                overlay={
                                                    <Tooltip id={"tooltop-download"}>
                                                    Download {draft.title}
                                                    </Tooltip>
                                                }
                                            >
                                                <div>
                                                    <FaFileDownload style={{ margin: '0 15px' }} size='1.5em' title="Download Draft" color={!draft.unlocked ? 'silver' : '#5895B2'}/>
                                                    Download
                                                </div>
                                            </OverlayTrigger>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">
                                            <OverlayTrigger
                                                key="Submit Draft"
                                                placement="top"
                                                overlay={
                                                    <Tooltip id={"tooltop-submit"}>
                                                    Sumbit {draft.title} to trustee
                                                    </Tooltip>
                                                }
                                            >
                                                <div>
                                                    <FaPaperPlane style={{ margin: '0 15px' }} size='1.5em' title="Submit Draft" color={draft.unlocked ? 'silver' : '#5895B2'}/>
                                                    Sumbit
                                                </div>
                                            </OverlayTrigger>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/action-4">
                                            <OverlayTrigger
                                                key="Draft Settings"
                                                placement="top"
                                                overlay={
                                                    <Tooltip id={"tooltop-settings"}>
                                                    {draft.title} Settings
                                                    </Tooltip>
                                                }
                                            >
                                                <div>
                                                    <FaCog style={{ margin: '0 15px' }} size='1.5em' title="Draft Settings" color={draft.changeSettings ? 'silver' : '#5895B2'}/>
                                                    Settings
                                                </div>
                                            </OverlayTrigger>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/action-5">
                                            <OverlayTrigger
                                                key="Delete Draft"
                                                placement="top"
                                                overlay={
                                                    <Tooltip id={"tooltop-delete"}>
                                                    Delete {draft.title}
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

    return (
        <div className="container body-container w-50 d-flex flex-column align-items-center ">
            <h1 className=" my-4 text-primary">Dashboard</h1>
            <h3>{`Hello, ${name}`}</h3>
            <div className="mb-5">
                {/* <button onClick={handleGetTextFiles}>Get Text Files</button>             */}
                <button onClick={handleChangeClick}>Get Text Files</button>            
            </div>
                <h2 className="mb-4 text-primary">My Drafts</h2>
            <div className="container d-flex w-100 p-0 justify-content-between align-items-end mb-4">

                        <Link to="/editor" >
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
                            <Link to="/settings" className="btn btn-primary rounded-6 btn-lg">
                                <FaUserCog size='1.5em' />
                            </Link>
                        </OverlayTrigger>
                            
            </div>
                            <LoadingDashboard />
        </div>
    )
}
