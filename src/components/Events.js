import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';

const Events = () => {
    const [events, setEvents] = useState(null);
    useEffect(() => {
        fetch('/events?limit=9', {
            'Content-Type': 'application/json',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setEvents(data);
            })
            .catch((error) => console.log('Error fetching data: ', error));
    }, []);

    return (
        <div>
            <h1>Recent events</h1>
            <div className="eventHead">
                <ul>
                    <li>Date</li>
                    <li>Killer</li>
                    <li>Victim</li>
                </ul>
            </div>
            {events &&
                events.map((e) => (
                    <Link
                        to={`/event/${e.EventId}`}
                        key={e.EventId}
                        className="eventCard"
                    >
                        <ul>
                            <li>
                                <ul className="dateList">
                                    <li>{Moment(e.TimeStamp).format('DD/MM/YYYY')}</li>
                                    <li>{Moment(e.TimeStamp).format('HH:mm:ss')}</li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li>{e.Killer.Name}</li>
                                    <li>{e.Killer.GuildName}</li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li>{e.Victim.Name}</li>
                                    <li>{e.Victim.GuildName}</li>
                                </ul>
                            </li>
                        </ul>
                    </Link>
                ))}
        </div>
    );
};

export default Events;
