import DiningLocation from './DiningLocation'
import React, { useState } from 'react';
import dropdownIcon from '../assets/icons/chevron-meals.svg'
import breakfastIcon from "../assets/icons/sunrise-dark.svg";
import lunchIcon from "../assets/icons/sun.svg";
import dinnerIcon from "../assets/icons/moon.svg";

const MealtimeSection = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const mealtimeIcon = () => {
        switch(props.mealtime.name) {
            case 'Breakfast':
                return breakfastIcon;
            case 'Lunch':
                return lunchIcon;
            default:
                return dinnerIcon;
        }
    }

    return (
        <div className="mealtimeSection">
            <div className="mealtime-banner row" onClick={toggleDropdown}>
                <h2 className="mealtimeTitle">
                <img className={`dropdown-icon ${isOpen ? '' : 'closed'}`} src={dropdownIcon} alt="dropdown" />
                    {props.mealtime.name}
                    <img className={`mealtime-icon ${props.mealtime.name.toLowerCase()}`} alt={props.mealtime.name} src={mealtimeIcon()} />
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