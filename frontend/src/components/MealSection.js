import React, { useState } from 'react';
import MealItem from './MealItem'
import dropdownIcon from '../assets/icons/chevron-red-down.png';
import dropupIcon from '../assets/icons/chevron-red-up.png';

const MealSection = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="mealSection">
            <button className="sectionTitle" onClick={toggleDropdown}>
                {(props.items.length == 0) 
                    ? ""
                    : <img className={`dropdown-icon ${isOpen ? '' : 'closed'}`} src={isOpen ? dropdownIcon : dropupIcon} alt="dropdown" />}
                <span>{props.stations}</span>
            </button>

            <div className={`${isOpen ? 'dd-open' : 'dd-closed'} dropdown-container`}>
                {props.items.map((item) => (
                    <MealItem name={item.name} allergens={item.allergens} />
                ))}
            </div>
        </div>
    );
}

export default MealSection;
