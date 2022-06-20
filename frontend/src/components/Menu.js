import React, { useEffect, useState } from 'react';

import Header from './Header';
import MealSection from './MealSection';
import Navbar from './Navbar';
import SearchBar from './SearchBar'
import axios from 'axios';
import breakfastIcon from "../assets/icons/sunrise-dark.svg";
import DiningLocation from './DiningLocation';

export default function Menu() {
    const [menu, setMenu] = useState(null);

    useEffect(() => {

        try {
            async function fetchMenu() {
                const menuRes = await axios.get('http://localhost:8000/menu/')
                if (menuRes.statusText === "OK") {
                    setMenu(menuRes.data)
                }
            }
            fetchMenu()
        }
        catch (e) {
            console.log(e)
        }
    }, []);
    if (menu == null) {
        return <div>Loading...</div>
    }

    return (
        <div style={{ marginTop: 0 }}>
            <div className="container-fluid top-navbar">
                <SearchBar />
                <Header locationName={menu[0].dining_halls[0].name} />
            </div>
            {menu != null && menu.length > 0
                ?
                <div className="container-fluid menuItems">
                   {menu.map(function (mealtime) {
                        return (
                            <div className="mealtime-section">
                                <div className="mealtime-banner row">
                                    <h2 className="mealtimeTitle">
                                        {mealtime.name}
                                        <img className="mealtime-icon" alt="Breakfast" src={breakfastIcon} />
                                    </h2>
                                </div>
                                {mealtime.dining_halls.map(function (dining_hall) {
                                    return (
                                        <DiningLocation location={dining_hall} />
                                    )
                                })}
                            </div>
                        )
                   })}
                </div>
                : <p>Menu loading...</p>}
            <Navbar />
        </div>
    )
}

{/* <div className="container-fluid menuItems">
    <h1 className="dining-location">{menu[0].dining_halls[0].name}</h1>
    <h2 className="mealtimeTitle">Breakfast</h2>
    {menu[0].dining_halls[0].stations.map(function (stations) {
        return (
            <MealSection stations={stations.name} items={stations.items} />
        );
    })}
</div> */}

//npx json-server --watch db.json --port 8000

