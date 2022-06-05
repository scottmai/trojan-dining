import React from "react";
import breakfastIcon from "../assets/icons/sunrise.svg";

const Navbar = () => {
    return (
        <div className="container-fluid navbar">
            <div className="row justify-content-center">
                <div className="col">
                    <a href="#">Village</a>
                </div>
                <div className="col">
                    <a href="#">EVK</a>
                </div>
                <div className="col">
                    <a href="#">Parkside</a>
                </div>
                <div className="col">
                    <a href="#"><img className="mealtime-icon" alt="Breakfast" src={breakfastIcon} /></a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
