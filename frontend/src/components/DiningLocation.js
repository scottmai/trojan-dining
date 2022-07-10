import React from "react";
import MealSection from "./MealSection";

const DiningLocation = (props) => {
    return (
        <div className="diningLocation">
            <h2 id={`${props.location.name.toLowerCase()}-${props.mealtime.toLowerCase()}`}
                className="location-title">
                {props.location.name}
            </h2>
            {props.location.stations.map(function (station) {
                return (
                    <MealSection stations={station.name} items={station.items} />
                )
            })}
        </div>
    );
}

export default DiningLocation;