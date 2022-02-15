import React from 'react';
import Navbar from './Navbar';
import MealSection from './MealSection';
import Header from './Header'
import SearchBar from './SearchBar'

// Hardcoded version of data
const props = {
    name: "Breakfast",
    dining_halls: [
        {
            name: "USC Village Dining Hall",
            stations: [
                {
                    name: "Plant Based",
                    items: [
                        {
                            name: "Steamed Carrots",
                            allergens: ["Vegan"]
                        },
                        {
                            name: "Your Mom",
                            allergens: ["Vegan"]
                        }
                    ]
                },
                {
                    name: "Flexiterian",
                    items: [
                        {
                            name: "Cow",
                            allergens: ["Cows"]
                        },
                        {
                            name: "UCLA",
                            allergens: ["Traitors"]
                        }
                    ]
                }
            ]
        }
    ]
}

var current;  // which dining hall you want to display

const App = () => {
    current = props.dining_halls[0].stations;
    return (
        <div className="App">
            <div className="container-fluid">
                <SearchBar />
                <Header locationName={props.dining_halls[0].name} />
                {current.map(function(stations) {
                    return (
                        <MealSection stations={stations.name} items={stations.items} />
                    );
                })}
            </div>
            <Navbar />
        </div>
    );
};

export default App;
