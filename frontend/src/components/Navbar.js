import React from "react";
import breakfastIcon from "../assets/icons/sun-rising.png";

const Navbar = () => {
    return (
        <div className="container-fluid nav">
            <div className="d-flex align-items-center gap-3">
                <button className="nostyle">Village</button>
                <button className="nostyle">EVK</button>
                <button className="nostyle">Parkside</button>
                <button className="nostyle"><img className="mealtime-icon" alt="Breakfast" src={breakfastIcon} /></button>
            </div>
        </div>
    );
}

export default Navbar;
