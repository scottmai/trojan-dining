import React from "react";
import { Link } from "react-router-dom";
import bellIcon from "../assets/icons/bell-white.png";

const Navbar = () => {
    return (
        <div className="container-fluid nav-red d-md-flex align-items-center">
            <div className="row justify-content-evenly text-align-center">
                <button className="col-5 col-md-12 location">Village</button>
                <button className="col-5 col-md-12 mealtime">Lunch</button>
                <Link className="col-2 col-md-12 notifications text-center" to="/subscriptions">
                    <button>
                        <img src={bellIcon} alt="Notification settings" />
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
