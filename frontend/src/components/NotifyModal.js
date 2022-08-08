import React, {useState} from 'react'
import ReactModal from 'react-modal'
import AlertForm from './AlertForm'
import xIcon from "../assets/icons/x.svg"

ReactModal.setAppElement('#root');

function NotifyModal() {
      const [modalIsOpen, setModalIsOpen] = useState(false)
      return (
       <div className="notify-modal">
            <button className="notify-btn" onClick={() => setModalIsOpen(true)}>Notify Me!</button>
            <ReactModal 
                isOpen={modalIsOpen} 
                onRequestClose={() => setModalIsOpen(false)}
                className="Modal"
                overlayClassName="Overlay"
                closeTimeoutMS={200} 
            >
                <div className="position-absolute top-0 end-0">
                    <button className="close-btn" onClick={() => setModalIsOpen(false)}>
                        <img className="xIcon" src={xIcon} alt="close button"></img>
                    </button>
                </div>
                <div>
                    <h5 className="modalTitle mb-0">Type in your email or phone number to access notification settings.</h5>
                    <small className="text-muted mb-3 mt-0">Please fill out at least one field.</small>
                </div>
                <AlertForm/>
            </ReactModal>
        </div>
    )
}

export default NotifyModal;

