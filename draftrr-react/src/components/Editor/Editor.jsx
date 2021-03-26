import { useEffect, useRef } from "react"

import "./Editor.scss"

export const Editor = () => {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, [inputRef]);
    return (
        <div className="body-container editor-container p-5">
            <div className="d-flex justify-content-between align-items-end">
                <button>Draft Settings</button>
                <div className="d-flex flex-column align-items-center">
                    <label htmlFor="draftTitle">Draft Title</label>
                    <input id="draftTitle" type="text"/>
                </div>
                <div>
                    <button className="mr-2">Save For Later</button>
                    <button>Submit</button>
                </div>

            </div>
            <div name="mainTextBox" id="mainTextBox" ref={inputRef} contenteditable="true">
                <span id="locked"></span>
            </div>
        </div>
    )
}
