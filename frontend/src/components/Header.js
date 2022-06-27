import React, {useState} from "react";
import Form from "react-bootstrap/Form";

const Header = ({locationName}) => {
    const today = new Date();
    const [displayDate, setDisplayDate] = useState(today);
    return (
        <div className="header row">
            <div className="col-5 date-picker">
                <Form.Group controlId="menu_date" size="sm">
                <Form.Control
                    type="date"
                    name="menu_date"
                    value={displayDate.getDate}
                    defaultValue={today.getDate}
                    onChange={(e) => setDisplayDate(e)}
                />
                </Form.Group>
            </div>
        </div>
    );
}

export default Header;
