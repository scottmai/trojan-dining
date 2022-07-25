const MealItem = (props) => {
    console.log({ props })
    return (
        <div className="row mealItem">
            <div className="col">{props.name}</div>
            <div className="col allergens">
                {props.allergens.map((allergen) => <span className={"allergen-" + allergen.name.toLowerCase()}>•</span>)}
            </div>
        </div>
    );
}

export default MealItem;
