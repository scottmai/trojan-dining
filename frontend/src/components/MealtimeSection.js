import DiningLocation from './DiningLocation'
import React, { useState } from 'react';

import dropdownIcon from '../assets/icons/chevron-red-down.png';
import dropupIcon from '../assets/icons/chevron-red-up.png';

import breakfastIcon from "../assets/icons/sunrise-dark.svg";
import lunchIcon from "../assets/icons/sun.svg";
import dinnerIcon from "../assets/icons/moon.svg";

const MealtimeSection = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const mealtimeIcon = () => {
        switch (props.mealtime.name) {
            case 'Breakfast':
                return breakfastIcon;
            case 'Lunch':
                return lunchIcon;
            default:
                return dinnerIcon;
        }
    }

    return (
        <div className="mealtimeSection nostyle">
            <div className="mealtime-banner row" onClick={toggleDropdown}>
                <h1 id={props.mealtime.name.toLowerCase()} className="mealtimeTitle">
                    <img className={`dropdown-icon ${isOpen ? '' : 'closed'}`} src={isOpen ? dropdownIcon : dropupIcon} alt="dropdown" />
                    <span>{props.mealtime.name}</span>
                    {/* <img className={`mealtime-icon ${props.mealtime.name.toLowerCase()}`} alt={props.mealtime.name} src={mealtimeIcon()} /> */}
                </h1>
            </div>
            <div className={`${isOpen ? 'dd-open' : 'dd-closed'}`}>
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
