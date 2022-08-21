import React, {useState} from "react";
import Moment from 'moment';

const Header = () => {
    const [startDate, setStartDate] = useState(new Date());
    Moment.locale('en');

    return (
        <div className="container-fluid header">
            <div className="row justify-content-center">
                <div className="datepicker col-4">
                    <input type="date" id="datepicker" name="meal-date"
                        value={Moment(startDate).format('YYYY-MM-DD')} min={Moment(startDate).format('YYYY-MM-DD')} />
                </div>
                <div className="legend col-4">
                    <button onClick={void(0)}>Legend</button>
                </div>
            </div>
        </div>
    );
}

export default Header;
