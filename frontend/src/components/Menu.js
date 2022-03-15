import React, { useEffect, useState } from 'react';

import Header from './Header';
import MealSection from './MealSection';
import Navbar from './Navbar';
import SearchBar from './SearchBar'
import axios from 'axios';

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

    return (
        <div style={{ marginTop: 0 }}>
            <div className="container-fluid top-navbar">
                <SearchBar />
                <Header locationName={menu[0].dining_halls[0].name} />
            </div>
            {menu != null && menu.length > 0
                ? <div className="container-fluid menuItems">
                    <h1 className="mealtimeTitle">Breakfast</h1>
                    {menu[0].dining_halls[0].stations.map(function (stations) {
                        return (
                            <MealSection stations={stations.name} items={stations.items} />
                        );
                    })}
                </div>
                : <p>Menu loading...</p>}
            <Navbar />
        </div>
    )
}

//npx json-server --watch db.json --port 8000

