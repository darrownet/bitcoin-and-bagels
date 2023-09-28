import React from 'react';
import BitcoinBaglesImg from "../../images/bitcoin-bagels.png"

const Home = () => {
    return (
        <div className="home">
            <h2>Join Us for a Unique Fusion: Bitcoin & Bagels Meetup!&nbsp;&nbsp;</h2>
            <p>Are you passionate about both the revolutionary world of Bitcoin and the delightful comfort of
                freshly baked NYC bagels? Look no further – our Bitcoin & Bagels meetup is the perfect blend of these
                two distinct yet captivating realms!</p>
            <div className="time-place-location">
                <img src={BitcoinBaglesImg} />
                <ul>
                    <ol><span>📅</span> Date: Occasional Sunday (with RSVP)</ol>
                    <ol><span>🕒</span> Time: 1:00PM</ol>
                    <ol><span>📍</span> Location: XxxXxx, 88 President Place, NYC</ol>
                </ul>
            </div>
            <h2>What to Expect:</h2>
            <p><span className="home-icon">🥯</span> <b>Bagel Delights:</b> Indulge in an array of mouthwatering bagels, from classic plain to everything-with-the-works, lovingly prepared for your enjoyment.</p>
            <p><span className="home-icon">💰</span> <b>Bitcoin Exploration:</b> Immerse yourself in the world of Bitcoin with an engaging presentation that will demystify the cryptocurrency landscape. Whether you're a seasoned crypto enthusiast or just dipping your toes, there's something for everyone.</p>
            <p><span className="home-icon">🗣️</span> <b>Interactive Discussions:</b> Connect with fellow attendees, share your insights, and ask burning questions during our interactive Q&A session following the presentation.</p>
            <p><span className="home-icon">🎉</span> <b>Networking:</b> Expand your network and build relationships with like-minded individuals who share your interests in both cutting-edge technology and the simple pleasures of life.</p>
            <hr/>
            <p><b>Why Attend:</b><br/>At our Bitcoin & Bagels meetup, you get the best of both worlds – a delectable culinary experience combined with a deep dive into the fascinating realm of Bitcoin. Whether you're craving knowledge about blockchain technology or the perfect bagel spread, this meetup promises to leave you satisfied on all fronts.</p>
            <p>Don't miss out on this one-of-a-kind event where innovation and indulgence collide!</p>
            <hr/>
            <p><b>RSVP Today:</b><br/>Secure your spot by RSVPing at at any one of our upcoming meetups. Limited spaces available, so act fast!</p>
            <p>Indulge your taste buds, expand your horizons, and connect with fellow enthusiasts – all at the Bitcoin & Bagels meetup. We can't wait to share this delightful experience with you!</p>
            <p>For more information, reach out to us at matt@darrownet.com or 917-538-7852.</p>
            <hr/>
        </div>
    );
};

export default Home;
