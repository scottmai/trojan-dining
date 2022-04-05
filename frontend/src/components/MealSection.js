import MealItem from './MealItem'
import dropdownIcon from '../assets/icons/dropdown.svg'
import dropupIcon from '../assets/icons/dropup.svg'
import React, { useState } from 'react';

const MealSection = ({props}) => {
    const [toggled, toggle] = useState(true);
    let dropdownContent;
    let dropdownIconRender;
    
    if (toggled) {
        dropdownIconRender =<img src={dropupIcon} alt="dropdown" />;
        dropdownContent = (
            <div className="dropdown-container">
                {this.props.items.map(function(item) {
                    return (
                        <MealItem name={item.name} allergens={item.allergens} />
                    );
                })}
            </div>
        );
    } else {
        dropdownIconRender = <img src={dropdownIcon} alt="dropdown" />;
    }

    return (
        <div className="mealSection">
            <button className="sectionTitle" onClick={toggle(!toggled)}>
                {dropdownIconRender}
                <span>{this.props.stations}</span>
            </button>
            {dropdownContent}
        </div>
    );
}
export default MealSection;
