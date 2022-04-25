import React, { useState } from 'react';
import Modal from 'react-modal';

function NotificationForm() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    return (
        <div className="notification-form">
            <button onClick={() => setModalIsOpen(true)}>Open modal</button>
            <Modal 
                isOpen={modalIsOpen}
                shouldCloseOnOverlayclick={false} 
                onRequestClose={() => setModalIsOpen(false)}>
                style={
                    {
                        overlay: {
                            backgroundColor: 'grey'
                        },
                        content: {
                            color: 'red'
                        }
                    }
                }
                
                <h2>Modal Title</h2>
                <p>Modal Body</p>
                <div>
                    <button onClick={() => setModalIsOpen(false)}>Close</button>
                </div>
            </Modal>
        </div>
    )
}