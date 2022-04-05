import MealItem from './MealItem'
import dropdownIcon from '../assets/icons/dropdown.svg'
import dropupIcon from '../assets/icons/dropup.svg'
import React, { useState } from 'react';

const MealSection = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [items, setItems] = useState(props.items);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="mealSection">

            <button className="sectionTitle" onClick={toggleDropdown}>
                <img src={isOpen ? dropdownIcon : dropupIcon} alt="dropdown" />
                <span>{props.stationName}</span>
            </button>

            <div className={`dropdown-container ${isOpen ? 'open' : ''}`}>
                {items.map((item) => {
                    return (
                        <MealItem name={item.name} allergens={item.allergens} />
                    );
                })}
            </div>
            
        </div>
    );
}

export default MealSection;
