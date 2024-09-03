import { useState } from 'react'
import { useCacheFetch } from '../cache-hook'
import Header from './Header';
import Navbar from './Navbar';
import MealtimeSection from './MealtimeSection';
import NotifyModal from './NotifyModal';
import { SelectItemProvider } from './SelectItemContext';
import Preloader from './Preloader';

export default function Menu() {
    let menu = null;
    let date = new Date();

    function formatDate(date)
    {
        var year = date.toLocaleString("default", { year: "numeric" });
        var month = date.toLocaleString("default", { month: "2-digit" });
        var day = date.toLocaleString("default", { day: "2-digit" });
        return year + "-" + month + "-" + day;
    }

    const { status, data, error } = useCacheFetch(formatDate(date));
    
    // console.log(menu);

    if (status === 'fetching') {
        return <Preloader />
    }
    else if (status === 'fetched') {
        menu = data;
    }
    else if (status === 'error') {
        return <div>Error: {error}</div>
    }
    if (menu === null) {
        return <Preloader />
        // return <div>No items 🤔.</div>
    }
    
    return (
        <SelectItemProvider>
            <div className="menu nostyle">
                <Header />
                <div className="container-fluid menuItems">
                    <div className='row'>
                        {menu.Menu.meals.map(mealtime => (
                            <MealtimeSection mealtime={mealtime} />
                        ))
                        }
                    </div>
                    <Navbar />
                    <NotifyModal />
                </div>
            </div>
        </SelectItemProvider>
    )
}
