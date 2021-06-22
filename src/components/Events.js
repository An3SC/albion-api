import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';

const Events = () => {
    const [events, setEvents] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const fetchApi = async () => {
        const albionApi = `https://gameinfo.albiononline.com/api/gameinfo/events?limit=9`;
        const url = `https://api.allorigins.win/get?url=${encodeURIComponent(albionApi)}`;
        await fetch(url, {
            'Content-Type': 'application/json',
            cache: 'no-cache',
        })
            .then((response) => {
                if (response.ok) {
                    setLoaded(true);
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setEvents(data);
            })
            .catch((error) => console.log('Error fetching data: ', error));
    };

    useEffect(() => {
        fetchApi();
    }, []);

    function refreshPage() {
        setEvents(null);
        setLoaded(false);
        fetchApi();
        // window.location.reload(false);
    }

    const eventsResult = events && JSON.parse(events.contents);

    return (
        <div id="recentEvents">
            <div className="eventsTitle">
                <h1>Recent events</h1>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-refresh"
                    width="45"
                    height="45"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#1d2932"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={refreshPage}
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                    <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                </svg>
            </div>
            <div className="eventHead">
                <ul>
                    <li>Date</li>
                    <li>Killer</li>
                    <li>Victim</li>
                </ul>
            </div>
            {!loaded && (
                <div className="sk-chase">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                </div>
            )}
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
