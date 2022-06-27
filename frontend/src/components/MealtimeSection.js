import DiningLocation from './DiningLocation'
import React, { useState } from 'react';
import breakfastIcon from "../assets/icons/sunrise-dark.svg";

const MealtimeSection = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="mealtimeSection">
            <div className="mealtime-banner row" onClick={toggleDropdown}>
                <h2 className="mealtimeTitle">
                    {props.mealtime.name}
                    <img className="mealtime-icon" alt="Breakfast" src={breakfastIcon} />
                </h2>
            </div>
            
            <div className={`dining-location-list ${isOpen ? 'open' : ''}`}>
                {props.mealtime.dining_halls.map(function (dining_hall) {
                    return (
                        <DiningLocation location={dining_hall} />
                    )
                })}
            </div>
        </div>
    )
}

export default MealtimeSection;