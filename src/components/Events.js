import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';

const Events = () => {
    const [events, setEvents] = useState(null);
    useEffect(() => {
        const albionApi = `https://gameinfo.albiononline.com/api/gameinfo/events?limit=9`;
        const url = `https://api.allorigins.win/get?url=${encodeURIComponent(albionApi)}`;
        fetch(url, {
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

    const eventsResult = events && JSON.parse(events.contents);

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
            {eventsResult &&
                eventsResult.map((e) => (
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
                                    <li>
                                        <b>{e.Killer.Name}</b>
                                    </li>
                                    <li>{e.Killer.GuildName}</li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li>
                                        <b>{e.Victim.Name}</b>
                                    </li>
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
