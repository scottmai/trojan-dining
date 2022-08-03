//import React, { useEffect, useState } from 'react';
import React from 'react';

export default function AlertForm() {
    return (
        <form>
            <div className="form-group">
                <label for="userEmail" className="text-muted">Email</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailForm" placeholder="tommytrojan@usc.edu" required/>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <small className="form-text text-muted">Check the box if you would like to receive email notifications too</small>
            </div>
            <div className="form-group">
                <label for="userPhone" className="text-muted">Phone</label>
                <input type="tel" className="form-control" id="tel" aria-describedby="phoneForm" placeholder="123-456-7890" pattern="^\d{4}-\d{3}-\d{4}$" required/>
            </div>
            <button type="submit" className="btn btn-primary">Subscribe</button>
        </form>
    )
}

