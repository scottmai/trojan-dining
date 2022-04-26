import React, {useState, useRef, useEffect, useCallback} from 'react';
import Modal from 'react-modal';
import styled from 'styled-components'
import {MdClose} from 'react-icons/md';
//import {useSpring, animated} from 'react-spring;'

function NotifyModal() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    
    //create open modal function
    const openModal = () => {
        setModalIsOpen(prev => !prev);
    };

    const modalRef = useRef();

    // const animation = useSpring({
    //     config: {
    //       duration: 250
    //     },
    //     opacity: modalIsOpen ? 1 : 0,
    //     transform: modalIsOpen ? `translateY(0%)` : `translateY(-100%)`
    //   });

    const closeModal = e => {
        if (modalRef.current === e.target) {
            setModalIsOpen(false);
        }
    };

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && modalIsOpen) {
                setModalIsOpen(false);
            }
        },
        [setModalIsOpen, modalIsOpen]
    );

    const Button = styled.button`
        min-width: 100px;
        padding: 16 px 32px;
        border-radius: 4px;
        border: none;
        background: #990000;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
    `;

    const Background = styled.div`
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const ModalImg = styled.img`
        width: 100%;
        height: 80%;
        border-radius: 10px 0 0 10px;
        background: #000;s
    `;

    const ModalWrapper = styled.div`
        width: 800px;
        height: 500px;
        box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
        background: #fff;
        color: #000;
        display: grid;
        grid-template-columns: 1fr 1fr;
        position: relative;
        z-index: 10;
        border-radius: 10px;
    `;

    const ModalContent = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        line-height: 1.8;
        color: #141414;
    
        p {
            margin-bottom: 1rem;
        }

        button {
            padding: 10px 24px;
            background: #141414;
            color: #fff;
            border: none;
        }
    `;

    const ClosedModalButton = styled(MdClose)`
        cursor: pointer;
        position: absolute;
        top: 20px;
        right: 20px;
        width: 32px;
        height: 32px;
        padding: 0;
        z-index: 10;
    `;

    useEffect( () => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress)},
        [keyPress]
    );

    return (
        <div className="notify-modal">
             <Button onClick={() => setModalIsOpen(true)}>Notify Me!</Button>
            {modalIsOpen ? (
                <Background onclick={closeModal} ref={modalRef}>
                        <ModalWrapper modalIsOpen={modalIsOpen}>
                            <ModalImg src={require('./meal.jpg')} alt='platter of food' />
                            <ModalContent>
                                 <h1>Want to get updated?</h1>
                                 <p>Sign up to get alerts every time your favorite meal is featured at the dining hall!</p>
                                 <Button>Notify Me</Button>
                            </ModalContent>
                             <ClosedModalButton
                                aria-label='Close modal'
                                onClick={() => setModalIsOpen(prev => !prev)}
                            />
                        </ModalWrapper>
                </Background>
                ) : null}   
        </div>
    );
}

export default NotifyModal;