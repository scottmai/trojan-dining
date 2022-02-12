import React, { useEffect } from 'react';
import axios from 'axios';

export default function Menu() {
    useEffect(() => {

        async function fetchMenu(){
            const menuRes = await axios.get('http://localhost:8000/menu/')
            setMenu()(menuRes.data)
        }
        fetchMenu()
    }, []);

}

//npx json-server --watch db.json --port 8000
//that creates endpoints:
//   /menu GET means fetch all menus
//   /menu/{id} GET fetch a single menu
//   /menu POST add a new menu
//   /menu/{id} DELETE delete a blog
