import React, { useEffect, useState } from 'react';
import Gear from './Gear';
import Inventory from './Inventory';
import { Link } from 'react-router-dom';

const Event = () => {
    const [event, setEvent] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const eventParams = window.location.pathname.slice(7);
        const albionApi = `https://gameinfo.albiononline.com/api/gameinfo/events/${eventParams}`;
        const url = `https://api.allorigins.win/get?url=${encodeURIComponent(albionApi)}`;
        fetch(url, {
            'Content-Type': 'application/json',
        })
            .then((response) => {
                if (response.ok) {
                    setLoaded(true);
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setEvent(data);
            })
            .catch((error) => console.log('Error fetching data: ', error));
    }, []);

    const eventResult = event && JSON.parse(event.contents);
    const killerGear = eventResult && eventResult.Killer.Equipment;
    const victimGear = eventResult && eventResult.Victim.Equipment;
    const victimInventory = eventResult && eventResult.Victim.Inventory;

    const finalIPKiller =
        Math.abs(eventResult && eventResult.Killer.AverageItemPower) > 999
            ? Math.sign(eventResult && eventResult.Killer.AverageItemPower) *
                  (
                      Math.abs(eventResult && eventResult.Killer.AverageItemPower) / 1000
                  ).toFixed(2) +
              'k'
            : Math.round(
                  Math.sign(eventResult && eventResult.Killer.AverageItemPower) *
                      Math.abs(eventResult && eventResult.Killer.AverageItemPower)
              );

    const finalIPVictim =
        Math.abs(eventResult && eventResult.Victim.AverageItemPower) > 999
            ? Math.sign(eventResult && eventResult.Victim.AverageItemPower) *
                  (
                      Math.abs(eventResult && eventResult.Victim.AverageItemPower) / 1000
                  ).toFixed(2) +
              'k'
            : Math.round(
                  Math.sign(eventResult && eventResult.Victim.AverageItemPower) *
                      Math.abs(eventResult && eventResult.Victim.AverageItemPower)
              );
    let pName;
    let pGuild;
    let pDamage;
    for (let i = 0; i < eventResult && eventResult.numberOfParticipants; i++) {
        pName = eventResult && eventResult.Participants[i].Name;
        pGuild = eventResult && eventResult.Participants[i].GuildName;
        pDamage = eventResult && eventResult.Participants[i].DamageDone;
    }

    return (
        <div id="event">
            {!loaded && (
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            )}
            <h1>Event #{eventResult && eventResult.EventId}</h1>
            <div className="victimHead">
                <div>
                    <Link
                        to={
                            eventResult
                                ? `/player/${eventResult && eventResult.Killer.Id}`
                                : '#'
                        }
                        key={eventResult && eventResult.Killer.Id}
                        className="playerCard"
                    >
                        <p>Killer: {eventResult && eventResult.Killer.Name}</p>
                    </Link>
                    <p>Guild: {eventResult && eventResult.Killer.GuildName}</p>
                </div>
                <div>
                    <Link
                        to={
                            eventResult
                                ? `/player/${eventResult && eventResult.Victim.Id}`
                                : '#'
                        }
                        key={eventResult && eventResult.Victim.Id}
                        className="playerCard"
                    >
                        <p>Victim: {eventResult && eventResult.Victim.Name}</p>
                    </Link>
                    <p>Guild: {eventResult && eventResult.Victim.GuildName}</p>
                </div>
                <p>Participants: {eventResult && eventResult.numberOfParticipants}</p>
            </div>
            <div className="eventGear">
                <div>
                    <p>Killer's Gear</p>
                    <p>{eventResult && finalIPKiller} IP</p>
                </div>
                <Gear gear={eventResult && killerGear} killer={true} />
                <div>
                    <div>{pName}</div>
                    <div>{pGuild}</div>
                    <div>{pDamage}</div>
                </div>
            </div>
            <div className="eventGear">
                <div>
                    <p>Victim's Gear</p>
                    <p>{eventResult && finalIPVictim} IP</p>
                </div>
                <Gear gear={eventResult && victimGear} killer={false} />
            </div>
            <div className="eventGear">
                <div>
                    <p>Victim's Inventory</p>
                </div>
                <Inventory inventory={eventResult && victimInventory} />
            </div>
        </div>
    );
};

export default Event;
