import React, { useEffect, useState } from 'react';
import Header from './Header';
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
        <div className="menu nostyle">
            <Header />
            {/* <NotifyModal /> */}
            <div className="container-fluid menuItems">
                <div className="row">
                    {menu.map(mealtime => (
                        <MealtimeSection mealtime={mealtime} />
                    ))}
                </div>
            </div>

            <Navbar />
        </div>
    )
}
