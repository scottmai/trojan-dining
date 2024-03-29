import React, { useEffect, useState } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import axios from 'axios';
import MealtimeSection from './MealtimeSection';
import NotifyModal from './NotifyModal';
import { SelectItemProvider } from './SelectItemContext';
import Preloader from './Preloader';

export default function Menu() {
    const [menu, setMenu] = useState(null);

    useEffect(() => {

        try {
            async function fetchMenu() {
                const menuRes = await axios.get('https://trojan-dining.herokuapp.com/menu/?date=2022-08-25')
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
        return <Preloader />
    } else if (menu.length === 0) {
        return <div>No items 🤔</div>
    }
    return (
        <SelectItemProvider>
            <div className="menu nostyle">
                <Header />
                <div className="container-fluid menuItems">
                    <div className='row'>
                        {menu.map(mealtime => (
                            <MealtimeSection mealtime={mealtime} />
                        ))}
                    </div>
                    <Navbar />
                    <NotifyModal />
                </div>
            </div>
        </SelectItemProvider>
    )
}
