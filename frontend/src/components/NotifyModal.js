import React, {useState} from 'react'
import ReactModal from 'react-modal'
import Modal from 'react-modal'
import AlertForm from './AlertForm'
import xIcon from "../assets/icons/x.svg"

const customStyles = {
    overlay: {
        zIndex: 8,
        background: 'rgba(0, 0, 0, 0.80)',
    },
    content: {
        margin: 'auto'
    }
};

ReactModal.setAppElement('#root');

function NotifyModal() {
      const [modalIsOpen, setModalIsOpen] = useState(false)
      return (
       <div className="notify-modal">
            <button className="notify-btn" onClick={() => setModalIsOpen(true)}>Notify Me!</button>
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={() => setModalIsOpen(false)} 
                style={customStyles}
            >
                <div className="position-absolute top-0 end-0">
                    <button className="close-btn" onClick={() => setModalIsOpen(false)}>
                        <img className="xIcon" src={xIcon} alt="close button"></img>
                    </button>
                </div>
                <div>
                    <h4>Type in your email or phone number to access notification settings.</h4>
                    <small className="text-muted mb-3 mt-0">Please fill out at least one field.</small>
                </div>
                <AlertForm/>
            </Modal>
        </div>
    )
}

export default NotifyModal;

