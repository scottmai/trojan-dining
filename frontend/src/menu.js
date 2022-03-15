import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Menu() {
    const [menu, setMenu] = useState(null);
    
    useEffect(() => {

        try {
            async function fetchMenu(){
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

    console.log({menu: menu })

    if (menu == null ){
        return <div>Menu was not fetched</div>
    }
    else {
        return <div>Menu was fetched!</div>
    }
}

//npx json-server --watch db.json --port 8000

