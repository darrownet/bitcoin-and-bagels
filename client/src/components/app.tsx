import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import Routes from "./routes";
import Nav from "./navigation/nav";

const App = () => {
    return (
        <Router basename="/">
            <Nav/>
            <div className="content">
                <Routes/>
            </div>
        </Router>
    );
};

export default App;
