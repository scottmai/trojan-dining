import React from "react";

const Navbar = () => {
    return (
        <div className="container-fluid navbar">
            <div className="row justify-content-center">
                <div className="col">
                    <a>Village</a>
                </div>
                <div className="col">
                    <a>EVK</a>
                </div>
                <div className="col">
                    <a>Parkside</a>
                </div>
                <div className="col">
                    <a>Mealtime</a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
