import React, { useState } from 'react';
import MealSection from "./MealSection";
import dropdownIcon from '../assets/icons/chevron-red-down.png';

const DiningLocation = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="diningLocation col-md-4">
            <div className="location-header row" onClick={toggleDropdown}>
                    <img className={`dropdown-icon ${isOpen ? '' : 'closed'} col-2`} src={dropdownIcon} alt="dropdown" />
                    <h2 className='location-title col'>{props.location.name}</h2>
            </div>
            <div className={`dropdown-container ${isOpen ? 'dd-open' : 'dd-closed'}`}>
                {props.location.stations.map(station => (
                    <MealSection stations={station.name} items={station.items} />
                ))}
            </div>            
        </div>
    );
}

export default DiningLocation;
