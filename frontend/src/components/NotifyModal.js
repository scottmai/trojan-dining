import React, {useState} from 'react';
import Modal from 'react-modal';
import img from "./meal.jpg";

// Modal.setAppElement('root')
function NotifyModal() {
     const [modalIsOpen, setModalIsOpen] = useState(false)
     return (
        <div className="notify-modal">
            <button class="notify-btn" onClick={() => setModalIsOpen(true)}>Notify Me!</button>
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={() => setModalIsOpen(false)} 
                style={
                    {
                        overlay: {
                            background: 'rgba(0, 0, 0, 0.80)'
                        },
                        content: {
                            top: '150px',
                            left: '120px',
                            right: '120px',
                            bottom: '150px',
                        }
                    }
                }
            >
                <img class="meal-img" src={img} alt="platter of food"/>
                <div>
                    <h3>Want to get updated?</h3>
                    <p>Sign up to get alerts every time your favorite meal is featured at the dining hall!</p>
                </div>
                <div>
                    <button onClick={() => setModalIsOpen(false)}>X</button>
                </div>
            </Modal>
        </div>
     )
}

export default NotifyModal;