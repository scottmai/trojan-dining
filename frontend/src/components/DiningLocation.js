import React, { useState } from 'react';
import MealSection from "./MealSection";
import dropdownIcon from '../assets/icons/chevron-red-down.png';

const DiningLocation = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="diningLocation nostyle">
            <button className="location-header row" onClick={toggleDropdown}>
                <h2 className="location-title">
                    <img className={`dropdown-icon ${isOpen ? '' : 'closed'}`} src={dropdownIcon} alt="dropdown" />
                    <span>{props.location.name}</span>
                </h2>
            </button>
            <div className={`dropdown-container ${isOpen ? 'dd-open' : 'dd-closed'}`}>
                {props.location.stations.map(station => (
                    <MealSection stations={station.name} items={station.items} />
                ))}
            </div>            
        </div>
    );
}

export default DiningLocation;
