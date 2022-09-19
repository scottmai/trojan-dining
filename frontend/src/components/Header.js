import React, {useState} from "react";
import Moment from 'moment';
import AllergenModal from './AllergenModal';

const Header = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [showAllergenModal, setAllergenModal] = useState(false);
    Moment.locale('en');

    const toggleAllergenModal = () => setAllergenModal(!showAllergenModal);

    return (
        <div className="header">
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center">
                    <h5 className="col text-center header-title">Trojan Dining</h5>
                </div>
                <div className="row btn-nav justify-content-center">
                    <div className="datepicker col-4">
                        <input type="date" id="datepicker" name="meal-date"
                            value={Moment(startDate).format('YYYY-MM-DD')} min={Moment(startDate).format('YYYY-MM-DD')} />
                    </div>
                    <div className="legend col-4">
                        <button onClick={toggleAllergenModal}>Allergen Key</button>
                    </div>
                </div>
            </div>
            <AllergenModal onClose={toggleAllergenModal} show={showAllergenModal} />
        </div>
    );
}

export default Header;
