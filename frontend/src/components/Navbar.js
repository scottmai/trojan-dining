import React from "react";
import bellIcon from "../assets/icons/bell-white.png";

const Navbar = () => {
    return (
        <div className="container-fluid nav-red d-md-flex align-items-center">
            <div className="row justify-content-evenly text-align-center">
                <button className="col col-md-12 location">Village</button>
                <button className="col col-md-12 mealtime">Lunch</button>
                <button className="col-2 col-md-12 notifications">
                    <img src={bellIcon} alt="Notification settings" />
                </button>
            </div>
        </div>
    );
}

export default Navbar;
