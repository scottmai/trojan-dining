import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SubscriptionsList = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [isUnsubscribing, setIsUnsubscribing] = useState(false);
    const [subscriptions] = useState([
        {
            id: 1,
            item_id: '1',
            name: 'Poke bowl',
            email_notifications_enabled: true,
            phone_notifications_enabled: true,
        },
        {
            id: 2,
            item_id: '2',
            name: 'Chicken tenders',
            email_notifications_enabled: true,
            phone_notifications_enabled: false,
        },
        {
            id: 3,
            item_id: '3',
            name: 'Gyro',
            email_notifications_enabled: false,
            phone_notifications_enabled: true,
        },
    ])
    const isSelected = (subscription) => selectedItems.some(item => subscription.id === item.id);
    const toggleSelectItem = (subscription) => {
        const idx = selectedItems.findIndex(item => item.id === subscription.id);
        const newItems = [...selectedItems];
        if (idx !== -1) {
            newItems.splice(idx, 1);
        } else {
            newItems.push(subscription);
        }
        setSelectedItems(newItems);
    }
    const handleSelectAll = () => {
        if (selectedItems.length === subscriptions.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(subscriptions);
        }
    }

    const handleUnsubscribe = async () => {
        setIsUnsubscribing(true);
        // dummy request to show loading state
        const menuRes = await axios.get('https://trojan-dining.herokuapp.com/menu/?date=2022-08-25')
        console.log({ menuRes })
        setIsUnsubscribing(false);
    }

    const getUnsubscribeButtonText = () => {
        if (isUnsubscribing) {
            return 'Unsubscribing...';
        }
        if (selectedItems.length === subscriptions.length) {
            return 'Unsubscribe from all';
        }
        if (selectedItems.length === 0) {
            return 'Unsubscribe';
        }
        if (selectedItems.length === 1) {
            return 'Unsubscribe from 1 item';
        }
        return `Unsubscribe from ${selectedItems.length} items`;
    }
    return (
        <div className="subscriptions-list">
            <div className="subscription list-header">
                <div className="d-flex">
                    <input type="checkbox" onChange={handleSelectAll} />
                    <div>
                        <b>Menu item</b>
                    </div>
                </div>
            </div>
            {subscriptions.map(subscription => (
                <div key={subscription.id} className="subscription">
                    <div className="d-flex">
                        <input type="checkbox"
                            checked={isSelected(subscription)}
                            onChange={() => toggleSelectItem(subscription)}
                        />
                        <div>
                            {subscription.name}
                        </div>
                    </div>
                    {/* edit notification backend not ready yet */}
                    {/* <div>
                    <img src={pencilSquare} alt="icon" width="24" className="hover-btn" />
                </div> */}
                </div>
            ))}
            <div className="unsubscribe d-flex justify-content-end pt-4">
                <button className="btn" disabled={selectedItems.length === 0} onClick={handleUnsubscribe}>
                    {getUnsubscribeButtonText()}
                </button>
            </div>
        </div>
    );
}

export default SubscriptionsList;
