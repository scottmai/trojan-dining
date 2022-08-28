import React, { useState } from "react";
import bellIcon from "../assets/icons/bell-white.png";
import NotifyModal from "./NotifyModal";

const Navbar = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const openModal = () => {
        // set Notify Modal state to true
        setModalIsOpen(true);
        console.log("Opened");
    }
    
    return (
        <div className="container-fluid nav-bot">
            <div className="row justify-content-evenly">
                <button className="col location">Village</button>
                <button className="col mealtime">Lunch</button>
                <button className="col-2 notifications" onClick={openModal}>
                    <img src={bellIcon} alt="Notification settings" />
                    <NotifyModal
                        modalIsOpen={modalIsOpen}
                        setModalIsOpen={setModalIsOpen}
                    />
                </button>
            </div>
        </div>
    );
}

export default Navbar;
