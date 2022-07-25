import React, { useEffect, useState } from 'react';
import Header from './Header';
import MealSection from './MealSection';
import Navbar from './Navbar';
import SearchBar from './SearchBar'
import axios from 'axios';
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

    return (
        <div>
            <div className="container-fluid top-navbar">
                <SearchBar />
                <Header locationName={menu[0].dining_halls[0].name} />
                <NotifyModal />
            </div>
            {menu.map(meal => (
                <div className="container-fluid menuItems">
                    <h1 className="mealtimeTitle">{meal.name}</h1>
                    {meal.dining_halls.map(diningHall => (
                        diningHall.stations.map(station => (
                            <MealSection stations={station.name} items={station.items} />
                        ))
                    ))}
                    {/* {meal.dining_halls[0].stations.map(function (stations) {
                        return (
                            <MealSection stations={stations.name} items={stations.items} />
                        );
                    })} */}
                </div>
            ))}
            <Navbar />
        </div>
    )
}
