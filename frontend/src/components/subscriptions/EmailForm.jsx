import { useState } from "react";

const EmailForm = ({ initialEmail, onUpdateEmail }) => {
    const [email, setEmail] = useState(initialEmail);
    const handleChange = e => setEmail(e.target.value);
    const handleSubmit = e => {
        if (e.currentTarget.checkValidity()) {
            e.preventDefault();
            onUpdateEmail(email);
        }
    }
    return (
        <form className="email-form" onSubmit={handleSubmit}>
            <span>Please enter your email to access notification settings</span>
            <input
                className="email-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
            />
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    )
}

export default EmailForm;
