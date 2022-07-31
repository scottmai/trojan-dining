import React from "react";
import breakfastIcon from "../assets/icons/sun-rising.png";

const Navbar = () => {
    return (
        <div className="container-fluid nav">
            <div className="d-flex align-items-center gap-3">
                <a href="#">Village</a>
                <a href="#">EVK</a>
                <a href="#">Parkside</a>
                <a href="#"><img className="mealtime-icon" alt="Breakfast" src={breakfastIcon} /></a>
            </div>
        </div>
    );
}

export default Navbar;
