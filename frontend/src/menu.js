import React, { useEffect } from 'react';
import axios from 'axios';

export default class menu extends Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}

useEffect(() => {
    //REMOVE this later
console.log('use effect ran');

    async function fetchMenu(){
        const menuResponse = await axios.get('http://localhost:8000/menu/')
        FileSystemEntry(menuResponse.data)
    }
    fetchMenu()
}, [])

//npx json-server --watch db.json --port 8000
//that creates endpoints:
//   /menu GET means fetch all menus
//   /menu/{id} GET fetch a single menu
//   /menu POST add a new menu
//   /menu/{id} DELETE delete a blog

useEffect(( => {
    fetch('http://localhost:8000/menu')
        //instead of async
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data)
            setMenu(data);
        });
}, []));