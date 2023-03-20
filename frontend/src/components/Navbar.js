import React from "react";
import { Link } from "react-router-dom";
import bellIcon from "../assets/icons/bell-white.png";

const Navbar = () => {
    return (
        <div className="container-fluid nav-red d-md-flex align-items-center">
            <div className="row justify-content-evenly text-align-center">
                <div className="nav-link col-5 col-md-12 location">Village</div>
                <div className="nav-link col-5 col-md-12 mealtime">Lunch</div>
                <Link to="/subscriptions" className="notifications col-2 col-md-12">
                    <div className="nav-link text-center">
                        <img src={bellIcon} alt="Notification settings" />
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
