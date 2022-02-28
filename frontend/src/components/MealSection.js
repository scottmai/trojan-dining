import MealItem from './MealItem'

const MealSection = (props) => {

    return (
        <div className="mealSection">
            <h1>{props.stations}</h1>
            <ul>
                {props.items.map(function(item) {
                    return (
                        <MealItem name={item.name} allergens={item.allergens} />
                    );
                })}
            </ul>
        </div>
    );
}

export default MealSection;
