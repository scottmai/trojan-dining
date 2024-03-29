import React, { useState, useContext } from 'react';
import { SelectItemContext } from './SelectItemContext';
import axios from 'axios';

// selectedItem is never null
export default function AlertForm() {
    const [selectedItem, setSelectedItem] = useContext(SelectItemContext);

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const inputEmail = (event) => {
        setEmail(event.target.value);
    }

    const inputPhone = (event) => {
        setPhone("+1" + event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('item_id', selectedItem.id)
        formData.append('email', email)
        if (phone) {
            formData.append('phone_number', phone)
        }
        const response = await axios.post('https://trojan-dining.herokuapp.com/notify/', formData)
        if (response.statusText === 'OK') {
            setSelectedItem(null)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mt-3">
                <label for="userEmail" className="text-muted">Email</label>
                <input type="email" onChange={inputEmail} className="form-control" id="email" name="email" aria-describedby="emailForm" placeholder="tommytrojan@usc.edu" required />
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="emailCheckbox" defaultChecked />
                <small className="form-text text-muted">Receive email notifications too</small>
            </div>
            <div className="form-group mt-3">
                <label for="userPhone" className="text-muted">Phone</label>
                <input type="tel" onChange={inputPhone} className="form-control" id="tel" name="tel" aria-describedby="phoneForm" placeholder="123-456-7890" pattern="^\d{3}\d{3}\d{4}$" />
            </div>
            <button type="submit" className="btn subscribeBtn mt-4 position-absolute end-0" onClick={handleSubmit}>Subscribe</button>
        </form>
    )
}
