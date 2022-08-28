import React, { useState } from 'react'
import ReactModal from 'react-modal'
import AlertForm from './AlertForm'
import xIcon from "../assets/icons/altx.png"

ReactModal.setAppElement('#root');

const NotifyModal = (props) => {
    return (
       <div className="notify-modal">
            <ReactModal 
                isOpen={props.modalIsOpen} 
                onRequestClose={() => props.setModalIsOpen(false)}
                className="Modal"
                overlayClassName="Overlay"
                closeTimeoutMS={200} 
            >
                <div className="position-absolute top-0 end-0">
                    <button className="close-btn" onClick={() => props.setModalIsOpen(false)}>
                        <img className="xIcon" src={xIcon} alt="close button"></img>
                    </button>
                </div>
                <div>
                    <h5 className="modalTitle mb-0">Get notified for [menu_item]?</h5>
                    <small className="text-muted mb-3 mt-0">Please fill out at least one field.</small>
                </div>
                <AlertForm/>
            </ReactModal>
        </div>
    )
}

export default NotifyModal;

