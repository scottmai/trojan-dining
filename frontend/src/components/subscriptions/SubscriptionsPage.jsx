import './subscriptions.scss';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import chevronLeft from '../../assets/icons/chevron-left.svg';
import pencilSquare from '../../assets/icons/pencil-square.svg';
import { useState } from 'react';
import axios from 'axios';
import { useMemo } from 'react';
import SubscriptionsList from './SubscriptionsList';
import EmailForm from './EmailForm';

const SubscriptionsPage = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const [userEmail, setUserEmail] = useState(email ?? '');
    const [showEmailForm, setShowEmailForm] = useState(!userEmail);
    const handleUpdateEmail = email => {
        setUserEmail(email);
        setShowEmailForm(false);
    }
    const handleUserEmailClick = () => {
        if (!showEmailForm) setShowEmailForm(true);
    }

    return (
        <div className="subscriptions">
            <div className="subscriptions-header">
                <Link to="/" className="back-btn">
                    <img src={chevronLeft} alt="icon" width="28" />
                </Link>
                <div>
                    <div className="title">Notifications settings</div>
                    <div className="user-email" onClick={handleUserEmailClick}>
                        {userEmail}
                    </div>
                </div>
            </div>
            <div className="subscriptions-content">
                {showEmailForm
                    ? <EmailForm initialEmail={userEmail} onUpdateEmail={handleUpdateEmail} />
                    : <SubscriptionsList />
                }
            </div>
        </div>
    );
}

export default SubscriptionsPage;
