import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import SearchBar from './SearchBar'
import axios from 'axios';
import MealtimeSection from './MealtimeSection';
import NotifyModal from './NotifyModal'

export default function Menu() {
    const [menu, setMenu] = useState(null);

    useEffect(() => {

        try {
            async function fetchMenu() {
                const menuRes = await axios.get('https://trojan-dining.herokuapp.com/menu/')
                if (menuRes.statusText === "OK") {
                    setMenu(menuRes.data.Menu.meals)
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
        <div>
            <div className="container-fluid top-navbar">
                <SearchBar />
                <Header locationName={menu[0].dining_halls[0].name} />
                <NotifyModal />
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
            ))}
            <Navbar />
        </div>
    )
}
