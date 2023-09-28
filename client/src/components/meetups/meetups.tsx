import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import Default from "../../images/bitcoin-bagels.png"

interface IMeetupsProps {
    title: string;
    timeGroup?: 'future' | 'past';
}

const Meetups: React.FC<IMeetupsProps> = ({timeGroup = '', title}) => {

    const meetupsRoute = `/api/meetups/get-${timeGroup}-meetups`;
    const location = useLocation();

    interface IMeetupServerObj {
        attendees: number;
        meetup: {
            _id: string;
            title: string;
            date: Date;
            description?: string;
            image?: string;
        }
    }

    interface IDisplayMeetup {
        id: string;
        attendees: number;
        title: string;
        date: Date;
        image: string;
    }

    const [meetups, setMeetups] = useState<IDisplayMeetup[]>([]);

    useEffect(() => {
        const abortCtrl = new AbortController();
        const fetchData = async () => {
            try {
                const response = await fetch(meetupsRoute, {signal: abortCtrl.signal});
                if (!response) {
                    throw new Error('Bad Network Response');
                }
                const data = await response.json();
                const meetups = conditionData(data.meetups);
                // @ts-ignore
                setMeetups(meetups);
            } catch (error) {
                console.log('fetch meetups error', error);
            }
        }
        fetchData();

        return () => {
            abortCtrl.abort();
            setMeetups([]);
        }
    }, [location]);

    return (
        <div className="meetups">
            <h2>{title}</h2>
            <ul>
                {meetups.map((meetup: any, index: number) => {
                    return (
                        <li key={index}>
                            <div className="img-title-date">
                                <img src={useDefault(meetup.image) ? Default : meetup.image} alt=""/>
                                <div>
                                    <h3>{meetup.title}</h3>
                                    <p>{meetup.date.toLocaleDateString()}</p>
                                </div>
                            </div>
                            {timeGroup === 'future' && <p className="attending">attending: {meetup.attendees}</p>}
                            {timeGroup === 'future' && <Link to={`/register/${meetup.id}`}>register</Link>}
                        </li>
                    )
                })}
            </ul>
            <img style={{"display":"none"}} src={Default} />
        </div>
    );

    function conditionData(data: IMeetupServerObj[]) {
        console.log(data);
        return data.map((meetup: IMeetupServerObj) => {
            return {
                id: meetup.meetup._id,
                attendees: meetup.attendees,
                title: meetup.meetup.title,
                description: meetup.meetup.description,
                date: new Date(meetup.meetup.date),
                image: meetup.meetup.image
            }
            // @ts-ignore
        }).sort((a: any, b: any) => {
            if (timeGroup === 'future') {
                return a.date - b.date;
            }
            if (timeGroup === 'past') {
                return b.date - a.date;
            }
        });
    }

    function useDefault(imagePath:string) {
        return imagePath === '/images/default.png';
    }

};

export default Meetups;
