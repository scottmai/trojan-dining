import React, { useEffect, useState } from 'react';
import axios from 'axios';
import App from './components/App'

export default function Menu() {

    const [menu, setMenu] = useState(null);
    
    useEffect(() => {
        fetchMenu();

        // try {
        //     async function fetchMenu(){
        //         const menuRes = await axios.get('http://localhost:8000/menu')
        //         if (menuRes.statusText === "OK") {
        //             setMenu(menuRes)
        //             return {
        //                 setMenu
        //             }
        //         }
        //     }
        //     fetchMenu();
        // }
        // catch (e) {
        //     console.log(e)
        // }
    }, []);

    async function fetchMenu() {
        try {
            const menuRes = await axios.get('http://localhost:8000/menu');
            setMenu(menuRes.data)
        }
        catch(e){
            console.log(e);
        }
        return (
            <App menuRes = {menu} />
        )
    }

    // console.log({menu: menu })

    // if (menu == null ){
    //     return <div>Menu was not fetched</div>
    // }
    // else {
    //     return <div>Menu was fetched!</div>
    // }
}

//npx json-server --watch db.json --port 8000

