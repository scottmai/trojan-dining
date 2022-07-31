import React, { useEffect, useState } from 'react';
import Header from './Header';
import MealSection from './MealSection';
import Navbar from './Navbar';
import SearchBar from './SearchBar'
import axios from 'axios';
import NotifyModal from './NotifyModal'
import MealtimeSection from './MealtimeSection';

export default function Menu() {
    const [menu, setMenu] = useState(null);

    useEffect(() => {

        try {
            async function fetchMenu() {
                const menuRes = await axios.get('https://trojan-dining.herokuapp.com/menu/')
                if (menuRes.statusText === "OK") {
                    setMenu(menuRes.data.Menu.meals)
                    console.log(menuRes.data.Menu.meals)
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
    } else if (menu.length === 0) {
        return <div>No items 🤔</div>
    }
    return (
        <div>
            <NotifyModal />
            <div className="container-fluid top-navbar">
                <SearchBar />
                <Header locationName={menu[0].dining_halls[0].name} />
            </div>
            <div className="container-fluid menuItems">
                {menu.map(mealtime => (
                    <MealtimeSection mealtime={mealtime} />
                ))}
            </div>

            <Navbar />
        </div>
    )
}
