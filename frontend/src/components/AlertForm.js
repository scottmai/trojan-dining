import React from 'react';

export default function AlertForm() {
    return (
        <form>
            <div className="form-group mt-3">
                <label for="userEmail" className="text-muted">Email</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailForm" placeholder="tommytrojan@usc.edu" required/>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="emailCheckbox" defaultChecked/>
                <small className="form-text text-muted">Receive email notifications too</small>
            </div>
            <div className="form-group mt-3">
                <label for="userPhone" className="text-muted">Phone</label>
                <input type="tel" className="form-control" id="tel" aria-describedby="phoneForm" placeholder="123-456-7890" pattern="^\d{4}-\d{3}-\d{4}$" />
            </div>
            <button type="submit" className="btn subscribeBtn mt-4 position-absolute end-0">Subscribe</button>
        </form>
    )
}
