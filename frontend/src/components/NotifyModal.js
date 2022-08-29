import React, { useState, useContext } from 'react'
import ReactModal from 'react-modal'
import AlertForm from './AlertForm'
import xIcon from "../assets/icons/altx.png"
import { SelectItemContext } from "./SelectItemContext";

ReactModal.setAppElement('#root');

const NotifyModal = () => {
    const [selectedItem, setSelectedItem] = useContext(SelectItemContext);
    let name = "";
    if (selectedItem != null){
        name = selectedItem.name;
    }
    return (
       <div className="notify-modal">
            <ReactModal 
                isOpen={selectedItem == null ? false : true} 
                onRequestClose={() => setSelectedItem(null)}
                className="Modal"
                overlayClassName="Overlay"
                closeTimeoutMS={200} 
            >
                <div className="position-absolute top-0 end-0">
                    <button className="close-btn" onClick={() => setSelectedItem(null)}>
                        <img className="xIcon" src={xIcon} alt="close button"></img>
                    </button>
                </div>
                <div>
                    <h5 className="modalTitle mb-0">Get notified for { name }?</h5>
                    <small className="text-muted mb-3 mt-0">Please fill out at least one field.</small>
                </div>
                <AlertForm/>
            </ReactModal>
        </div>
    )
}

export default NotifyModal;

