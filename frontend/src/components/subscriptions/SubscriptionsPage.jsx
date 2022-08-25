import { useSearchParams } from "react-router-dom";

const SubscriptionsPage = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    return (
        <div>
            <h1>Subscriptions</h1>
            <div>for {email}</div>
        </div>
    );
}

export default SubscriptionsPage;
