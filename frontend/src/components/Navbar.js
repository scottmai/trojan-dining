import React from "react";
import bellIcon from "../assets/icons/bell-white.png";

const Navbar = () => {
    return (
        <div className="container-fluid nav-red">
            <div className="row row-cols-xl-1 row-cols-3">
                <button className="col-5 location">Village</button>
                <button className="col-5 mealtime">Lunch</button>
                <button className="col-2 notifications">
                    <img src={bellIcon} alt="Notification settings" />
                </button>
            </div>
        </div>
    );
}

export default Navbar;
