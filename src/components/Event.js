import React, { useEffect, useState } from 'react';
import Gear from './Gear';
import Inventory from './Inventory';
import { Link } from 'react-router-dom';

const Event = () => {
    const [event, setEvent] = useState(null);
    useEffect(() => {
        const eventParams = window.location.pathname.slice(7);
        fetch(`https://gameinfo.albiononline.com/api/gameinfo/events/${eventParams}`, {
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

    const finalIPKiller =
        Math.abs(event && event.Killer.AverageItemPower) > 999
            ? Math.sign(event && event.Killer.AverageItemPower) *
                  (Math.abs(event && event.Killer.AverageItemPower) / 1000).toFixed(2) +
              'k'
            : Math.round(
                  Math.sign(event && event.Killer.AverageItemPower) *
                      Math.abs(event && event.Killer.AverageItemPower)
              );

    const finalIPVictim =
        Math.abs(event && event.Victim.AverageItemPower) > 999
            ? Math.sign(event && event.Victim.AverageItemPower) *
                  (Math.abs(event && event.Victim.AverageItemPower) / 1000).toFixed(2) +
              'k'
            : Math.round(
                  Math.sign(event && event.Victim.AverageItemPower) *
                      Math.abs(event && event.Victim.AverageItemPower)
              );
    let pName;
    let pGuild;
    let pDamage;
    for (let i = 0; i < event && event.numberOfParticipants; i++) {
        pName = event && event.Participants[i].Name;
        pGuild = event && event.Participants[i].GuildName;
        pDamage = event && event.Participants[i].DamageDone;

        console.log(pName, pGuild, pDamage);
    }

    return (
        <div>
            <h1>Event #{event && event.EventId}</h1>
            <div className="victimHead">
                <div>
                    <Link
                        to={`/player/${event && event.Killer.Id}`}
                        key={event && event.Killer.Id}
                        className="playerCard"
                    >
                        <p>Killer: {event && event.Killer.Name}</p>
                    </Link>
                    <p>Guild: {event && event.Killer.GuildName}</p>
                </div>
                <div>
                    <p>Victim: {event && event.Victim.Name}</p>
                    <p>Guild: {event && event.Victim.GuildName}</p>
                </div>
                <p>Participants: {event && event.numberOfParticipants}</p>
            </div>
            <div className="eventGear">
                <div>
                    <p>Killer's Gear</p>
                    <p>{event && finalIPKiller} IP</p>
                </div>
                <Gear eventId={event && event.EventId} killer={true} />
                <div>
                    <div>{pName}</div>
                    <div>{pGuild}</div>
                    <div>{pDamage}</div>
                </div>
            </div>
            <div className="eventGear">
                <div>
                    <p>Victim's Gear</p>
                    <p>{event && finalIPVictim} IP</p>
                </div>
                <Gear eventId={event && event.EventId} killer={false} />
            </div>
            <div className="eventGear">
                <div>
                    <p>Victim's Inventory</p>
                </div>
                <Inventory />
            </div>
        </div>
    );
};

export default Event;
