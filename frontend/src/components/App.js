import React from 'react';
import Navbar from './Navbar';
import MealSection from './MealSection';
import Header from './Header'
import SearchBar from './SearchBar'
import Menu from '../menu'

// Hardcoded version of data
// const props = {
//     name: "Breakfast",
//     dining_halls: [
//         {
//             name: "USC Village Dining Hall",
//             stations: [
//                 {
//                     name: "Plant Based",
//                     items: [
//                         {
//                             name: "Steamed Carrots",
//                             allergens: ["Vegan"]
//                         },
//                         {
//                             name: "Your Mom",
//                             allergens: ["Vegan"]
//                         }
//                     ]
//                 },
//                 {
//                     name: "Flexiterian",
//                     items: [
//                         {
//                             name: "Cow",
//                             allergens: ["Cows"]
//                         },
//                         {
//                             name: "UCLA",
//                             allergens: ["Traitors"]
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// }


//var current;  // which dining hall you want to display

export default function App(props){
    //const props = Menu();
    const displayMenu = (props) => {
    //current = props.dining_halls[0].stations;
        const current = props;
        if (current.length > 0){
            return (
                <div className="App">
                    <Menu />
                    <div className="container-fluid">
                        <SearchBar />
                        <Header locationName={current.dining_halls[0].name} />           
                        {current.map(function (stations) {
                            return (
                                <MealSection stations={stations.name} items={stations.items} />
                            );
                        })}
                    </div>
                    <Navbar />
                </div>
            );
        }
    }
    return(
        
        <displayMenu/>
        
    )    
    
    

}