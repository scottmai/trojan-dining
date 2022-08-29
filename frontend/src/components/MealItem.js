import bellIcon from "../assets/icons/bell-gray.png";
import { SelectItemContext } from "./SelectItemContext";
import { setState, useContext } from 'react';

const MealItem = (props) => {
    const [selectedItem, setSelectedItem] = useContext(SelectItemContext);
    return (
        <div className="row mealItem align-items-center">
            <div className="col-1"></div>
            <div className="col">{props.name}</div>
            <div className="col-3 allergens">
                {(props.allergens.length == 0) 
                    ? <span></span>
                    : props.allergens.map((allergen) => <span className={"allergen-" + allergen.name.toLowerCase()}>&#11044;</span>)
                }
            </div>
            <div className="col-1">
                <img 
                    onClick={() => setSelectedItem(props)}
                    className="notification-btn" 
                    src={bellIcon}
                    alt="Notification bell" 
                />
            </div>
        </div>
    );
}

export default MealItem;
