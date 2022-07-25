import React, { useEffect, useRef, useState } from 'react';

import Header from './Header';
import Navbar from './Navbar';
import SearchBar from './SearchBar'
import axios from 'axios';
import MealtimeSection from './MealtimeSection';

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

    // Scrolling logic using refs
    const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: 'smooth' }); 
    
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
                            <MealtimeSection mealtime={mealtime} />
                        )
                   })}
                </div>
                : <p>Menu loading...</p>}
            <Navbar />
        </div>
    )
}

// npx json-server --watch db.json --port 8000

