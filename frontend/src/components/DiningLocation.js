import React from "react";
import MealSection from "./MealSection";

const DiningLocation = (props) => {
    return (
        <div className="diningLocation">
            <h2 className="location-title">
                {props.location.name}
            </h2>
            {props.location.stations.map(station => (
                <MealSection stations={station.name} items={station.items} />
            ))}
        </div>
    );
}

export default DiningLocation;
