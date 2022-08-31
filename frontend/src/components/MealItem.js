import bellIcon from "../assets/icons/bell-gray.png";

const MealItem = (props) => (
    <div className="row mealItem align-items-center">
        {/* <div className="col-1"></div> */}
        <div className="col">{props.name}</div>
        <div className="col-3 allergens">
            {(props.allergens.length == 0) 
                ? <span></span>
                : props.allergens.map((allergen) => <span className={"allergen-" + allergen.name.toLowerCase()}>&#11044;</span>)
            }
        </div>
        <div className="col-1">
            <img className="notification-btn" src={bellIcon} alt="Notification bell" />
        </div>
    </div>
);

export default MealItem;
