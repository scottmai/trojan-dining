import React, { useState } from 'react';
import MealItem from './MealItem'
import dropdownIcon from '../assets/icons/chevron-red-down.png';

const MealSection = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="mealSection">
            <div className="row align-items-center meal-header" onClick={toggleDropdown}>
                {(props.items.length == 0)
                    ? <div className='col-2 dropdown-icon'></div>
                    : <img className={`dropdown-icon ${isOpen ? '' : 'closed'} col-2`} src={dropdownIcon} alt="dropdown" />}
                <span className='meal-title col'>{props.stations}</span>
            </div>

            {/* TODO: Possiby turn allergen colors into tooltip */}
            <div className={`dropdown-container ${isOpen ? 'dd-open' : 'dd-closed'}`}>
                {props.items.map((item) => (
                    <MealItem item={item} />
                ))}
            </div>
        </div>
    );
}

export default MealSection;
