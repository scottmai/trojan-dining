import React, { useState } from 'react';
import MealItem from './MealItem'
import dropdownIcon from '../assets/icons/chevron-red-down.png';
import dashIcon from '../assets/icons/dash.png';

const MealSection = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="mealSection">
            <button className="row meal-header" onClick={toggleDropdown}>
                    {(props.items.length == 0) 
                        ? <img className="icon dash-icon" src={dashIcon} alt="n/a" />
                        : <img className={`icon dropdown-icon ${isOpen ? '' : 'closed'}`} src={dropdownIcon} alt="dropdown" />}
                <span className='meal-title'>{props.stations}</span>
            </button>

            {/* TODO: Possiby turn allergen colors into tooltip */}
            <div className={`dropdown-container ${isOpen ? 'dd-open' : 'dd-closed'}`}>
                {props.items.map((item) => (
                    <MealItem name={item.name} allergens={item.allergens} />
                ))}
            </div>
        </div>
    );
}

export default MealSection;
