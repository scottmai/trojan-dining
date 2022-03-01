import MealItem from './MealItem'
import dropdownIcon from '../assets/icons/dropdown.svg'

const MealSection = (props) => {

    return (
        <div className="mealSection">
            <button className="sectionTitle">
                <img src={dropdownIcon} alt="dropdown" />
                <span>{props.stations}</span>
            </button>
            <div className="dropdown-container">
                {props.items.map(function(item) {
                    return (
                        <MealItem name={item.name} allergens={item.allergens} />
                    );
                })}
            </div>
        </div>
    );
}

export default MealSection;
