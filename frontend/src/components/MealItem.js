import bellIcon from "../assets/icons/bell-gray.png";
import { SelectItemContext } from "./SelectItemContext";
import { useContext } from 'react';

const MealItem = ({ item }) => {
    const { name, allergens } = item
    const [, setSelectedItem] = useContext(SelectItemContext);
    return (
        <div className="row mealItem align-items-center">
            <div className="col-2"></div>
            <div className="col">{name}</div>
            <div className="col-3 allergens">
                {(allergens.length == 0)
                    ? <span></span>
                    : allergens.map((allergen) => <span className={"allergen-" + allergen.name.toLowerCase()}>&#11044;</span>)
                }
            </div>
            <div className="col-1">
                <img
                    onClick={() => setSelectedItem(item)}
                    className="notification-btn"
                    src={bellIcon}
                    alt="Notification bell"
                />
            </div>
        </div>
    );
}

export default MealItem;
