import Menu from './Menu'
import React from 'react';

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
                            allergens: ["Vegan", "Dairy"]
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
                        },
                        {
                            name: "ABCD",
                            allergens: ["AB"]
                        },
                        {
                            name: "Lalalalala",
                            allergens: ["Traitors"]
                        },
                        {
                            name: "UCLA",
                            allergens: ["Traitors"]
                        }
                    ]
                },
                {
                    name: "Flexiterian2",
                    items: [
                        {
                            name: "Cow",
                            allergens: ["Cows"]
                        },
                        {
                            name: "UCLA",
                            allergens: ["Traitors"]
                        },
                        {
                            name: "ABCD",
                            allergens: ["AB"]
                        },
                        {
                            name: "Lalalalala",
                            allergens: ["Traitors"]
                        },
                        {
                            name: "UCLA",
                            allergens: ["Traitors"]
                        },
                        {
                            name: "ABCD",
                            allergens: ["AB"]
                        },
                        {
                            name: "Lalalalala",
                            allergens: ["Traitors"]
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

const App = () => {
    return (
        <div className="App">
            <Menu />
            <div className="container-fluid top-navbar">
                <SearchBar />
                <Header locationName={props.dining_halls[0].name} />
            </div>
            <div className="container-fluid menuItems">
                <h1 className="mealtimeTitle">Breakfast</h1>
                {current.map(function (stations) {
                    return (
                        <MealSection stationName={stations.name} items={stations.items} />
                    );
                })}
            </div>
            <Navbar />
        </div>
    );
};

export default App;
