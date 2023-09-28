import React, {useEffect} from 'react';
import {Routes, Route, useLocation} from "react-router-dom";

import Home from "./home/home";
import About from "./about/about";
import Meetups from "./meetups/meetups";
import Register from "./register/register"
import Sponsors from "./sponsors/sponsors"

const AppRoutes = () => {

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register/:meetup_id" element={<Register />}/>
            <Route path="/future-meetups" element={<Meetups timeGroup="future" title="Upcoming Meetups..."/>}/>
            <Route path="/past-meetups" element={<Meetups timeGroup="past" title="Past Meetups..."/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/sponsors" element={<Sponsors/>}/>
        </Routes>
    );
};

export default AppRoutes;
