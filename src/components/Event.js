import React, { useEffect, useState } from 'react';

const Event = () => {
    const [event, setEvent] = useState(null);
    useEffect(() => {
        const eventParams = window.location.pathname.slice(7);
        fetch(`/events/${eventParams}`, {
            'Content-Type': 'application/json',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setEvent(data);
            })
            .catch((error) => console.log('Error fetching data: ', error));
    }, []);

    const { Killer, Victim, numberOfParticipants } = event;

    const ip = Killer.AverageItemPower;

    const finalIP =
        Math.abs(ip) > 999
            ? Math.sign(ip) * (Math.abs(ip) / 1000).toFixed(2) + 'k'
            : Math.sign(ip) * Math.abs(ip);

    return (
        <div>
            <h1>Event #{event && event.EventId}</h1>
            <div className="victimHead">
                <div>
                    <p>Killer: {event && Killer.Name}</p>
                    <p>{event && Killer.GuildName}</p>
                </div>
                <div>
                    <p>Victim: {event && Victim.Name}</p>
                    <p>{event && Victim.GuildName}</p>
                </div>
                <p>Participants: {event && numberOfParticipants}</p>
            </div>
            <div className="killerGear">
                <div>
                    <p>Killer's Gear</p>
                    <p>{event && finalIP} IP</p>
                </div>
            </div>
        </div>
    );
};

export default Event;
