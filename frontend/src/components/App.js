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
        </div>
    );
};

export default App;
