const MealItem = (props) => {
    return (
        <div className="row mealItem">
            <div className="col">{props.name}</div>
            <div className="col allergens">{props.allergens.map(function(allergen) {
                return (
                    <span className={"allergen-" + allergen.toLowerCase()}>•</span>
                );
            })}</div>
        </div>
    );
}

export default MealItem;
