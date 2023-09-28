import React from 'react';
import {Link} from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="navigation">
            <h1>Bitcoin & Bagels</h1>
            <nav>
                <ol>
                    <li className="navitem"><Link to="/">Home</Link></li>
                    <li className="navitem"><Link to="/future-meetups">Upcoming Meetups</Link></li>
                    <li className="navitem"><Link to="/past-meetups">Past Meetups</Link></li>
                    <li className="navitem"><Link to="/about">About</Link></li>
                    <li className="navitem"><Link to="/sponsors">Sponsors</Link></li>
                </ol>
            </nav>
        </div>
    );
};

export default Navigation;
