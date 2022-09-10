import DiningLocation from './DiningLocation'
import React, { useState } from 'react';

import dropdownIcon from '../assets/icons/chevron-black-down.png';

import breakfastIcon from "../assets/icons/mealtime_breakfast.png";
import lunchIcon from "../assets/icons/mealtime_lunch.png";
import dinnerIcon from "../assets/icons/mealtime_dinner.png";

const MealtimeSection = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const mealtimeIcon = () => {
        switch (props.mealtime.name) {
            case 'Breakfast':
                return breakfastIcon;
            case 'Dinner':
                return dinnerIcon;
            default:
                return lunchIcon;
        }
    }

    return (
        <div className="mealtimeSection">
            <div className="mealtime-header row" onClick={toggleDropdown}>
                <h1 id={props.mealtime.name.toLowerCase()} className="mealtime-title">
                    <img className={`dropdown-icon ${isOpen ? '' : 'closed'}`} src={dropdownIcon} alt="dropdown" />
                    <span>{props.mealtime.name}</span>
                    <img className={`mealtime-icon ${props.mealtime.name.toLowerCase()}`} alt={props.mealtime.name} src={mealtimeIcon()} />
                </h1>
            </div>
            <div className={`row dropdown-container ${isOpen ? 'dd-open' : 'dd-closed'}`}>
                {props.mealtime.dining_halls.map(function (dining_hall) {
                    return (
                        <DiningLocation location={dining_hall} mealtime={props.mealtime.name} />
                    )
                })}
            </div>
        </div>
    )
}

export default MealtimeSection;
