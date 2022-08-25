import React from 'react';
import Menu from './Menu';
import SubscriptionsPage from './subscriptions/SubscriptionsPage';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

const App = () => {
    return (
        <div className="App" >
            <BrowserRouter>
                <Routes>
                    <Route path="/subscriptions/" element={<SubscriptionsPage />} />
                    <Route path="*" element={<Menu />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
