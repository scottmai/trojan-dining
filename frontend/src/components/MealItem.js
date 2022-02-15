const MealItem = (props) => {
    return (
        <div className="row mealItem">
            <div className="col">{props.name}</div>
            <div className="col">{props.allergens}</div>
        </div>
    );
}

MealItem.defaultProps = {
    name: "EVK is best",
    allergens: "none"
}

export default MealItem;
