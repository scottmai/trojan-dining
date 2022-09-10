import React from "react";
import bellIcon from "../assets/icons/bell-white.png";

const Navbar = () => {
    return (
        <div className="container-fluid nav-bot">
            <div className="row justify-content-evenly">
                <button className="col location">Village</button>
                <button className="col mealtime">Lunch</button>
                <button className="col-2 notifications">
                    <img src={bellIcon} alt="Notification settings" />
                </button>
            </div>
        </div>
    );
}

export default Navbar;
